// script.js updated with Arbitrum simulation (Layer 1 and Layer 2 separation)
let blockchain = []; // Layer 2
let layer1Chain = []; // Layer 1

function encryptText() {
  const input = document.getElementById("inputText").value;
  if (!input) return showToast("Please enter some text!");

  const encrypted = CryptoJS.AES.encrypt(input, "secret_key").toString();

  const block = {
    index: blockchain.length,
    data: encrypted,
    timestamp: new Date().toLocaleString(),
    hash: CryptoJS.SHA256(encrypted).toString(),
    prevHash: blockchain.length ? blockchain[blockchain.length - 1].hash : "0"
  };

  blockchain.push(block);
  saveBlockchain();
  updateBlockchainUI();

  document.getElementById("outputText").innerText = `Encrypted & Stored (L2): ${encrypted}`;
  showToast("Text encrypted and stored on Layer 2 (Arbitrum)");
}

function submitToLayer1() {
  if (blockchain.length === 0) return showToast("No Layer 2 data to submit");

  const lastBlock = blockchain[blockchain.length - 1];

  const l1Block = {
    index: layer1Chain.length,
    dataHash: lastBlock.hash,
    timestamp: new Date().toLocaleString(),
    finalityProof: `OP-${Math.random().toString(36).substring(2, 8)}` // Simulated optimistic proof
  };

  layer1Chain.push(l1Block);
  saveBlockchain();
  updateLayer1UI();
  showToast("Submitted to Layer 1 (Finalized)");
}

function decryptText() {
  if (blockchain.length === 0) return showToast("Blockchain is empty!");

  const lastBlock = blockchain[blockchain.length - 1];
  const bytes = CryptoJS.AES.decrypt(lastBlock.data, "secret_key");
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  document.getElementById("outputText").innerText = `Decrypted: ${decrypted}`;
  showToast("Text decrypted successfully!");
}

function updateBlockchainUI() {
  const list = document.getElementById("blockchainList");
  list.innerHTML = "";

  blockchain.forEach(block => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>#${block.index}</strong> | ${block.timestamp}<br><span style='font-size: 0.85em;'>Hash: ${block.hash.substring(0, 25)}...</span>`;
    list.appendChild(li);
  });
}

function updateLayer1UI() {
  const list = document.getElementById("layer1List");
  list.innerHTML = "";

  layer1Chain.forEach(block => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>#${block.index}</strong> | ${block.timestamp}<br><span style='font-size: 0.85em;'>Finality: ${block.finalityProof}</span><br>Data Hash: ${block.dataHash.substring(0, 20)}...`;
    list.appendChild(li);
  });
}

function copyOutput() {
  const text = document.getElementById("outputText").innerText;
  navigator.clipboard.writeText(text);
  showToast("Output copied to clipboard!");
}

function saveBlockchain() {
  localStorage.setItem("blockchain", JSON.stringify(blockchain));
  localStorage.setItem("layer1Chain", JSON.stringify(layer1Chain));
}

function loadBlockchain() {
  const savedL2 = localStorage.getItem("blockchain");
  const savedL1 = localStorage.getItem("layer1Chain");
  if (savedL2) blockchain = JSON.parse(savedL2);
  if (savedL1) layer1Chain = JSON.parse(savedL1);
  updateBlockchainUI();
  updateLayer1UI();
}

function exportBlockchain() {
  const blob = new Blob([JSON.stringify({ l2: blockchain, l1: layer1Chain }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "blockchain_export.json";
  a.click();
  URL.revokeObjectURL(url);
  showToast("Blockchain exported as JSON.");
}

function importBlockchain() {
  const fileInput = document.getElementById("importFile");
  const file = fileInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        blockchain = imported;
        layer1Chain = [];
      } else if (imported.l2 && imported.l1) {
        blockchain = imported.l2;
        layer1Chain = imported.l1;
      }
      saveBlockchain();
      updateBlockchainUI();
      updateLayer1UI();
      showToast("Blockchain imported successfully!");
    } catch (err) {
      showToast("Error parsing file.");
    }
  };
  reader.readAsText(file);
}

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("light-mode");
  const toggleBtn = document.getElementById("themeToggle");
  toggleBtn.textContent = body.classList.contains("light-mode") ? "🌙 Dark Mode" : "🌞 Light Mode";
  localStorage.setItem('theme', body.classList.contains("light-mode") ? 'light' : 'dark');
}

loadBlockchain();
