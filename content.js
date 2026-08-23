let enabled = chrome.storage.local.get("status", (data) => {
    enabled = data.status || false;
    console.log("initial status : " + enabled);
    removeFrame()
}) || false;

// On attend le message du popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.status !== undefined) {
        enabled = message.status;
        console.log("status received : " + enabled);

        removeFrame();
    }
});

function removeFrame() {
    // On lit le DOM a la recherche de l'IA overview et on le retire
    if (enabled) {
        const frame = document.querySelector('[data-mcp="18"]');
        if (frame) {
            frame.remove();
        }
    }
}