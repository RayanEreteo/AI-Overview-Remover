let enabled = false;

// Load saved status from storage
chrome.storage.local.get("status", (data) => {
    enabled = data.status || false;
    console.log("Initial status:", enabled);
    showFrame()
});

// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message) => {
    if (message.status !== undefined) {
        enabled = message.status;
        console.log("Status received:", enabled);
        showFrame()
    }
});

// Function to show the frame if enabled is true
function showFrame() {
    const frame = document.querySelector("#eKIzJc");
    if (!enabled) {
        frame.style.display = "block";
    }
}