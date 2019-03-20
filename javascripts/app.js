/*
TODO LIST
1. GENERATE AN EMPY OBJECT / 
2. CHECK IF TEXTBOX HAS VALUE /
3. CREATE AN OBJECT SKELETON
4.FUNCTIONALITIES
  - ADD LIST DATA to Localstorage
  - RENDER LIST DATA to DOM
  - REMOVE LIST DATA to localstorage 
  - REMOVE LIST DATA to DOM
  - ADDITIONAL: EDIT DATA to Localstorage and DOM
*/

/* 
CODE TO GET THE NUMBERS IN A STRING
var theString = "hello123124515-125125";
var numb = theString.match(/\d/g);
numb = numb.join("");

// ASSIGNMENT
CHECK IF an ARRAY HAS VALUE
*/

// window.onload = function() {
//   if(!(DataKey in localStorage)) {
//     localStorage.setItem(DataKey, JSON.stringify(starterTemplate));
//   } else {
//     console.log('has value... Ignoring generating of empty object');
//   }
// }

var inputList = document.getElementById('inputList'),
  captureButton = document.getElementById('captureData'),
  dataContainer = document.getElementById('dataContainer'),
  indexList;
var removeListItem = document.getElementById('removeListItem');
var starterTemplate = {};
const DataKey = "User-Info";
var listsHolder;

let todoListContainer = {
  lists: [],
  outputData: function() {
    listsHolder = ``;

    if(this.lists.length == 0) {
      dataContainer.innerHTML = `Add a list.`;
    } else {
      for(iter = 0; iter < this.lists.length; iter++){
        listsHolder += `
        <li class="todolist__list-item">${this.lists[iter].listData} 
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
  removeData: function(target) {
    if(target == 0) {
      this.lists.shift();
    } else if(target == this.lists.length) {
      this.lists.pop();
    } else {
      this.lists.splice(target, 1);
    }
    this.outputData();
  },
}

window.addEventListener('load', function(){
  todoListContainer.outputData();
})

captureButton.addEventListener('click', function() {
  if(!(inputList.value == "")) {
    // IF HAS VALUE
    captureData();
    todoListContainer.outputData();
  } else {
    alert('has no value');
  }
})

function getValue(clicked_index){
  var dataIndex = clicked_index;
  todoListContainer.removeData(dataIndex);
}

function captureData() {
  var theData = {listData: inputList.value};
  todoListContainer.lists.push(theData);
}
