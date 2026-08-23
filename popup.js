let _status = false; // Valeur par défaut avant chargement
const btn = document.getElementById("btn");

// 1. Charger l'état enregistré au moment de l'ouverture du popup
chrome.storage.local.get("status", (data) => {
    _status = data.status || false;
    updateUI(_status);
});

// 2. Écouter le clic pour inverser l'état
if (btn) {
    btn.addEventListener("click", toggleStatus);
}

function updateUI(enabled) {
    if (!btn) return;
    const label = document.getElementById("status-label");
    const description = document.getElementById("status-description");
    btn.classList.toggle("enabled", enabled);
    btn.setAttribute("aria-pressed", String(enabled));
    if (label) label.textContent = enabled ? "Activée" : "Désactivée";
    if (description) description.textContent = enabled ? "masqués" : "visibles";
}

function toggleStatus() {
    _status = !_status;
    console.log("new status : " + _status);

    // Sauvegarder
    chrome.storage.local.set({ status: _status });

    // Mettre à jour l'interface
    updateUI(_status);

    // Prévenir le content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, { status: _status });
        }
    });
}