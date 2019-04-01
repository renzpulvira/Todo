var inputList = document.getElementById('inputList'),
  captureButton = document.getElementById('captureData'),
  dataContainer = document.getElementById('dataContainer'),
  indexList;
var listsHolder;

let todoListContainer = {
  currentStorage: {},
  lists: [],
  listEditData: {
    listId: 0,
    listValue: ""
  },
  outputData: function () {
    listsHolder = ``;

    if (this.lists.length == 0) {
      dataContainer.innerHTML = `Add a list.`;
    } else {
      for (iter = 0; iter < this.lists.length; iter++) {
        listsHolder += `
        <li class="todolist__list-item">
        <span id="editDataWrapper" data-id="${iter}" class="todolist__list-data">${this.lists[iter].listData}</span>
        <button id="editBtn" 
                onclick="todoListContainer.editData(this.dataset.id)"
                class="edit-list"
                data-id="${iter}">
          <img src="../assets/images/edit-icon.png" />
        </button>
        <button id="removeListItem" 
                onclick="getValue(this.value)" 
                value="${iter}"  
                class="remove-list">
          <img src="../assets/images/error.png"/>
        </button></li>
        `;
        dataContainer.innerHTML = listsHolder;
      }
    }

    console.log(`Current lists: ${this.lists.length}`);
  },
  removeData: function (target) {
    if (target == 0) {
      this.lists.shift();
    } else if (target == this.lists.length) {
      this.lists.pop();
    } else {
      this.lists.splice(target, 1);
    }
    this.outputData();
    updateLocalStorage();
  },
  editData: function (value) {
    turnEditState();

    this.listEditData.listId = value
    inputList.value = this.lists[value].listData
  },
  updateData: function () {
    var overWriteIndex = this.listEditData.listId;
    this.lists[overWriteIndex].listData = inputList.value
    inputList.value = ""
    inputList.dataset.state = "adding"
    captureButton.innerText = "ADD LIST"
    updateLocalStorage();
  }
}

window.addEventListener('load', function () {

  if (localStorage.getItem('lists-data') === null) {
    localStorage.setItem('lists-data', JSON.stringify({}))
    convertToArray('lists-data');
  } else {
    convertToArray('lists-data');
  }
})

captureButton.addEventListener('click', function () {
  if (!(inputList.value == "")) {
    // IF HAS VALUE
    if (inputList.dataset.state == "editing") {
      todoListContainer.updateData();
    } else {
      captureData();
    }

    todoListContainer.outputData();
  } else {
    alert('has no value');
  }
})

function convertToArray(data_key) {
  var convertBack = Object.values(JSON.parse(localStorage.getItem(data_key)));
  todoListContainer.lists = convertBack
  todoListContainer.outputData();
}


function getValue(clicked_index) {
  var dataIndex = clicked_index;
  todoListContainer.removeData(dataIndex);
}

// Maybe turn this to an object function
function captureData() {
  var theData = { listData: inputList.value };
  todoListContainer.lists.push(theData);
  inputList.value = "";
  updateLocalStorage();
}

function turnEditState() {
  if (inputList.dataset.state === "adding") {
    captureButton.innerText = "DONE EDITING"
    inputList.dataset.state = "editing"
  }
}

function updateLocalStorage() {
  var dataStorage = Object.assign({}, todoListContainer.lists);
  localStorage.setItem('lists-data', JSON.stringify(dataStorage));
}