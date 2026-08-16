const btn = document.getElementById("btn")
btn.addEventListener("click", changeStatus)

function changeStatus() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab?.id) return;

    chrome.tabs.sendMessage(
        tab.id,
        { action: "OnOff", color: "yellow" },
        (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error:", chrome.runtime.lastError.message);
                return;
            }
            console.log("Response from content script:", response);
        }
    );
}