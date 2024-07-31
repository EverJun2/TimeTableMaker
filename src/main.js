let totalSubject
let totalClass

const subject = {}             //과목 객체
const combineResult = {}       //시간표 조합 객체

function addSubject(){
    const data =  document.getElementById("subjectName").value;
    const location = document.getElementById("resultBody");

    const newRow = document.createElement('tr');

    const newRow1 = document.createElement("td");
    const newRow2 = document.createElement("td");
    const newRow3 = document.createElement("td");
    const newRow4 = document.createElement("td");

    const checkBox = document.createElement("input");
    const name = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const addBtn = document.createElement("button");

    checkBox.setAttribute('type', 'checkbox');
    addBtn.setAttribute('class', 'addBtn');
    deleteBtn.setAttribute('class', 'deleteBtn');
    name.textContent = data;

    addBtn.textContent = '+';
    deleteBtn.textContent = '-';

    location.append(newRow);

    newRow.append(newRow1);
    newRow.append(newRow2);
    newRow.append(newRow3);
    newRow.append(newRow4);

    newRow1.append(checkBox);
    newRow2.append(name);
    newRow3.append(deleteBtn);
    newRow4.append(addBtn);

}