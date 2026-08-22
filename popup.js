let _status = false

const btn = document.getElementById("btn")
btn.addEventListener("click", changeStatus)

function changeStatus() {
    // Set new status value
    _status =! _status
    console.log("new status : " + _status);
    

    // Save new status to storage
    chrome.storage.local.set({ status: _status })

    //TODO : Change btn text
    // Update button UI
    if (_status == true){
        btn.style.backgroundColor = "green"
    }else{
        btn.style.backgroundColor = "red"
    }
}