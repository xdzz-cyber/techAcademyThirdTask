const newQueueElementValue = document.querySelector("#newQueueElementValue");
const removeOldestElementButton = document.querySelector(".removeOldestElementButton");
const responseMessage = document.querySelector(".responseMessage")
const queueOutputElements = document.querySelector(".queueOutputElements")
const addNewElementButton = document.querySelector(".addNewElementButton")
const queueLengthMaximumSize = 21;
const storageQueueKeyValue = "queue"
const responseMessages = {
    "maximumAmountOfElementsExceeded": "Maximum amount of elements exceeded",
    "queueIsEmpty": "Queue is empty",
    "newQueueValueCannotBeEmpty": "New queue value cannot be empty"
}
function init(){
    let queue = JSON.parse(localStorage.getItem(storageQueueKeyValue));

    if(!queue){
        console.log("shouldn't be here")
        updateQueue(JSON.stringify([]))
    }

    setEventListenersForButtons(queue)

    rerenderQueueOutput()
}
function clearInputOnAddition(){
    newQueueElementValue.value = "";
}
function setResponseMessageValue(value){
    responseMessage.textContent = value;
}
function updateQueue(newQueueValue){
    localStorage.setItem(storageQueueKeyValue, newQueueValue)
}
function rerenderQueueOutput(){
    queueOutputElements.textContent = JSON.parse(localStorage.getItem(storageQueueKeyValue))
}
function clearResponseMessage(){
    setResponseMessageValue("")
}
function setEventListenersForButtons(queue){
    addNewElementButton.addEventListener("click", () => {
        if(queue.length === queueLengthMaximumSize){
            setResponseMessageValue(responseMessages["maximumAmountOfElementsExceeded"])
        } else if(newQueueElementValue.value === ""){
            setResponseMessageValue(responseMessages["newQueueValueCannotBeEmpty"])
        }
        else{
            queue.push(newQueueElementValue.value)
            clearInputOnAddition()
            clearResponseMessage()
            updateQueue(JSON.stringify(queue))
            rerenderQueueOutput()
        }
    });

    removeOldestElementButton.addEventListener("click", () => {
        if(queue.length === 0){
            setResponseMessageValue(responseMessages["queueIsEmpty"])
        } else{
            queue.shift()
            clearResponseMessage()
            updateQueue(JSON.stringify(queue))
            rerenderQueueOutput()
        }
    });
}

init();


