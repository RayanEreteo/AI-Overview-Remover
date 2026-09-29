// Load the current status from storage and update the UI accordingly
let _status = chrome.storage.local.get("status", (data) => {
    _status = data.status ? true : false;
    updateUI(_status);
});

const btn = document.getElementById("btn");

if (btn) {
    btn.addEventListener("click", toggleStatus);
}

// Update the UI based on the current status
function updateUI(enabled) {
    if (!btn) return;

    const label = document.getElementById("status-label");
    const description = document.getElementById("status-description");

    btn.classList.toggle("enabled", enabled);
    btn.setAttribute("aria-pressed", String(enabled));

    if (label) label.textContent = enabled ? "Enabled" : "Disabled";
    if (description) description.textContent = enabled ? "hidden" : "visible";
}

// Toggle the status and communicate with the content script
function toggleStatus() {
    _status = !_status;

    // Saves to storage
    chrome.storage.local.set({ status: _status });

    // Update Interface
    updateUI(_status);

    // Send message to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
            chrome.tabs.sendMessage(tabs[0].id, { status: _status });
        }
    });
}