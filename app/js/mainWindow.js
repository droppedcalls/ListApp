const electron = require('electron');
const { ipcRenderer } = electron;

const ul = document.querySelector('.itemList');
var tempItem;
var tempTitle;

// Listeners
const addButton = document.querySelector(".addButton");
addButton.addEventListener('click', addItemEditor);

// Form keys
ul.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && e.target.nodeName === "INPUT") {
        document.querySelector('.applyButton').click();
    } else if (e.keyCode === 27 && e.target.nodeName === "INPUT") {
        document.querySelector('.cancelButton').click();
    }
})

ul.addEventListener('dblclick', (e) => {
    if (document.querySelector('.applyButton') == null || 
        document.querySelector('.applyButton').clicked == false) {
        editItem(e);
    }
});

document.querySelector('.title-text').addEventListener('dblclick', editTitle);

// Functions
function editTitle(e) {
    const input = document.createElement('input');
    input.className = "titleEditor";
    input.type = "text";
    input.value = e.target.innerHTML;

    tempTitle = e.target.childNodes[0];
    e.target.replaceChild(input, e.target.childNodes[0]);
    input.focus();

    input.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
            const title = document.createElement('h1');
            const titleText = document.createTextNode(input.value);
            title.append(titleText);
            
            e.target.parentElement.replaceChild(title, input);
        } else if (e.keyCode === 27) {
            e.target.parentElement.replaceChild(tempTitle, input);
        }
    })
}

function addItemEditor(e) {
    if (document.querySelector('.emptyMsg').style.display !== "none") {
        document.querySelector('.emptyMsg').style.display = "none";
    }

    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = "text";
    input.placeholder = "What do you need to buy today?";
    input.className = "activeItemCreate";

    li.appendChild(input);
    ul.appendChild(li);
    input.focus();

    createApplyButton(input);
    createCancelButton(input);
}

function addItem(e) {
    const li = e.target.parentElement;
    const itemText = document.createTextNode(e.target.previousSibling.value);

    if (e.target.previousSibling.className === "activeItemEdit") {
        document.querySelector('.deleteButton').remove();
    }

    li.replaceChild(itemText, e.target.previousSibling);
    document.querySelector('.cancelButton').remove();
    document.querySelector('.applyButton').remove();
}

function editItem(e) {
    const input = document.createElement('input');
    input.type = "text";
    input.value = e.target.innerHTML;
    input.className = "activeItemEdit";

    tempItem = e.target.childNodes[0];
    e.target.replaceChild(input, e.target.childNodes[0]);
    input.focus();

    createApplyButton(input);
    createCancelButton(input);
    createDeleteButton(input);
}

function createApplyButton(e) {
    const btn = document.createElement('button');
    btn.className = "applyButton";

    var btnText;
    if (e.className === "activeItemCreate") {
        btnText = document.createTextNode("Add");
    } else if (e.className === "activeItemEdit") {
        btnText = document.createTextNode("Edit");
    }

    btn.appendChild(btnText);
    btn.addEventListener('click', addItem);

    e.insertAdjacentElement('afterend', btn);
}

function createCancelButton(e) {
    const btn = document.createElement('button');
    btn.className = "cancelButton";
    const btnText = document.createTextNode("Cancel");

    btn.appendChild(btnText);
    e.nextSibling.insertAdjacentElement('afterend', btn)

    btn.addEventListener('click', () => {
        if (e.className === "activeItemEdit") {
            e.parentElement.replaceChild(tempItem, e);
            document.querySelector('.applyButton').remove();
            document.querySelector('.deleteButton').remove();
            btn.remove();
        } else if (e.className === "activeItemCreate") {
            e.parentElement.remove();

            if (document.querySelector('.emptyMsg').style.display == "none" && ul.childElementCount <= 0) {
                document.querySelector('.emptyMsg').style.display = "inline";
            }
        }
    });
}

function createDeleteButton(e) {
    const btn = document.createElement('button');
    btn.className = "deleteButton";

    const btnText = document.createTextNode('Delete');
    btn.appendChild(btnText);

    e.nextSibling.nextSibling.insertAdjacentElement('afterend', btn);

    btn.addEventListener('click', () => {
        e.parentElement.remove();
    });
}
