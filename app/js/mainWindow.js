const electron = require('electron');
const remote = require('electron').remote;
const { ipcRenderer } = electron;
const { Menu } = remote;

const ul = document.querySelector('.itemList');
var tempItem;

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

// Functions
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

    li.replaceChild(itemText, e.target.previousSibling);
    e.target.nextSibling.remove();
    e.target.remove();

    itemText.parentElement.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        itemMenu.popup({ window: remote.getCurrentWindow() })
      }, false)
}

function editItem(e) {
    console.log(e);
    const input = document.createElement('input');
    input.type = "text";
    input.value = e.target.innerHTML;
    input.className = "activeItemEdit";

    tempItem = e.target.childNodes[0];
    e.target.replaceChild(input, e.target.childNodes[0]);
    input.focus();

    createApplyButton(input);
    createCancelButton(input);
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
            btn.remove();
        } else if (e.className === "activeItemCreate") {
            e.parentElement.remove();

            if (document.querySelector('.emptyMsg').style.display == "none" && ul.childElementCount <= 0) {
                document.querySelector('.emptyMsg').style.display = "inline";
            }
        }
    });
}

/*function createDeleteButton(e) {
    const btn = document.createElement('button');
    const btnText = document.createTextNode('x');
    btn.appendChild(btnText);

    btn.className = "deleteButton";
    btn.style.display = "none";
    //console.log(e);

    e.insertAdjacentElement('afterend', btn);
    e.addEventListener('mouseover', () => {
        btn.style.display = "inline";
    })

    e.addEventListener('mouseout', () => {
        btn.style.display = "none";
    })

    btn.addEventListener('click', () => {
        e.remove();
        btn.remove();
    });
}*/

/*const menuTemplate = [
    {
        label: 'Edit item',
        click() {
            editItem();
        }
    },
    {
        label: 'Delete item',
        click() {
            //mainWindow.webContents.send('item:clear');
            console.log("cool");
        }
    },
    {
        label: 'Inspect',
        click() {
            remote.getCurrentWindow().toggleDevTools();
        }
    }
];
const itemMenu = Menu.buildFromTemplate(menuTemplate);*/
