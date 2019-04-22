const electron = require('electron');
const { ipcRenderer } = electron;

const ul = document.querySelector('.itemList');
var tempItem;

// Listeners
const addButton = document.querySelector(".addButton");
addButton.addEventListener('click', addItemEditor);

// Form keys
ul.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && e.target.nodeName === "INPUT") {
        addItem(e);
    } else if (e.keyCode === 27) {
        if (e.target.className === "activeItemEdit") {
            ul.replaceChild(tempItem, e.target);
        } else if (e.target.className === "activeItemCreate") {
            e.target.remove();
        }
    }
})

ul.addEventListener('dblclick', (e) => {
    if (document.querySelector('.applyButton') == null || 
        document.querySelector('.applyButton').clicked == false) {
        editItem(e);
    }
});

// Functions
function addItemEditor(e) {
    const li = document.createElement('input');
    li.type = "text";
    li.placeholder = "What do you need to buy today?";
    li.className = "activeItemCreate";

    ul.appendChild(li);
    li.focus();

    createButton(e);
}

//document.querySelector('.applyButton').addEventListener('click', addItem);

function addItem(e) {
    const li = document.createElement('li');
    const itemText = document.createTextNode(e.target.value);
    li.appendChild(itemText);
    ul.appendChild(li);

    if (tempItem == null) {
        e.target.remove();
    } else {
        ul.replaceChild(li, e.target);
    }
    
    document.querySelector('.applyButton').remove();
}

function editItem(e) {
    const li = document.createElement('input');
    li.type = "text";
    li.value = e.target.innerHTML;
    li.className = "activeItemEdit";

    ul.appendChild(li);

    tempItem = e.target;
    ul.replaceChild(li, e.target);
    createButton(e);
    li.focus();
}

function createButton(e) {
    const btn = document.createElement('button');
    btn.className = "applyButton";
    btn.appendChild(document.createTextNode("Add"));
    ul.appendChild(btn);
}