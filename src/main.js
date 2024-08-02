let totalSubject
let totalClass
let idx = 0;
let totalCnt = 1;

const classes = {}             //과목 객체
const combineResult = {}       //시간표 조합 객체

function addSubject(){
    //입력받은 값을 객체에 저장하고 페이지에 추가합니다
    const dataInclude =  document.getElementById("shouldInclude").value;
    const dataName =  document.getElementById("subjectName").value;
    const dataCode =  document.getElementById("subjectCode").value;

    const location = document.getElementById("classTableBody");

    const newRow = document.createElement('tr');

    const newRow1 = document.createElement("td");
    const newRow2 = document.createElement("td");
    const newRow3 = document.createElement("td");
    const newRow4 = document.createElement("td");

    const checkBox = document.createElement("div");
    const name = document.createElement("div");
    const code = document.createElement("div");
    const deleteBtn = document.createElement("button");

    deleteBtn.setAttribute('class', 'deleteBtn');
    deleteBtn.addEventListener('click', function(){
        delClassToObject(newRow, dataName);
    })

    checkBox.textContent = dataInclude;
    name.textContent = dataName;
    code.textContent = dataCodecode;
    deleteBtn.textContent = '-';

    location.append(newRow);

    newRow.append(newRow1);
    newRow.append(newRow2);
    newRow.append(newRow3);
    newRow.append(newRow4);

    newRow1.append(checkBox);
    newRow2.append(name);
    newRow3.append(code);
    newRow4.append(deleteBtn);

    
    addClassToObject(dataInclude,dataName,dataCode);
}

function addClassToObject(dataInclude,dataName,dataCode) {
    //과목을 객체에 추가합니다
    classes[dataName] = {};
    classes[dataInclude].check = dataInclude;
    classes[dataName].name = data;
    classes[dataName].id = dataCode;
}

function delClassToObject(newRow,dataName) {
    //과목을 객체와 페이지에서 삭제합니다
    delete classes[dataName];
    newRow.remove();
}

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
            
        reader.onload = function(e) {
            const text = e.target.result;
            const lines = text.split('\n').filter(line => line.trim() !== ''); // 빈 줄 제외
                
            // 새 데이터를 기존 객체 배열에 추가
            lines.forEach(line => {
                const [name, id, day, start, finish, check] = line.split(',').map(item => item.trim());
                if (name && id && check && day && start && finish) {
                    classes[idx] = {}
                    classes[idx].name = name;
                    classes[idx].id = id;
                    classes[idx].day = day;
                    classes[idx].startTime = start;
                    classes[idx].finishTime = finish;
                    classes[idx].check = check;
                    addTable(classes[idx]);
                }
            });
        };
        reader.readAsText(file);
    }
});


function addTable(data){
    const dataInclude =  data.check;
    const dataName =  data.name;
    const dataCode =  data.id;
    const dataDay = data.day;
    let dataTime = "";

    for(let i = data.startTime; i<=data.finishTime; i++){
        dataTime += i + "";
    }


    const location = document.getElementById("classTableBody");

    const newRow = document.createElement('tr');

    const newRow1 = document.createElement("td");
    const newRow2 = document.createElement("td");
    const newRow3 = document.createElement("td");
    const newRow4 = document.createElement("td");
    const newRow5 = document.createElement("td");
    const newRow6 = document.createElement("td");

    const checkBox = document.createElement("div");
    const name = document.createElement("div");
    const code = document.createElement("div");
    const day = document.createElement("div");
    const time = document.createElement("div");
    const deleteBtn = document.createElement("button");

    deleteBtn.setAttribute('class', 'deleteBtn');
    deleteBtn.addEventListener('click', function(){
        delClassToObject(newRow, dataName);
    })
    if(dataInclude === "Y"){
        newRow.setAttribute("class", "selected");
    }
    checkBox.textContent = dataInclude;
    name.textContent = dataName;
    code.textContent = dataCode;
    day.textContent = dataDay;
    time.textContent = dataTime;
    deleteBtn.textContent = '-';

    location.append(newRow);

    newRow.append(newRow1);
    newRow.append(newRow2);
    newRow.append(newRow3);
    newRow.append(newRow4);
    newRow.append(newRow5);
    newRow.append(newRow6);

    newRow1.append(checkBox);
    newRow2.append(name);
    newRow3.append(code);
    newRow4.append(day);
    newRow5.append(time);
    newRow6.append(deleteBtn);

    idx++;
}

function makeTimeTable() {
    
    classes.forEach(element => {
        combineResult[totalCnt] = {};
        combineResult[totalCnt].M1 = null;
        combineResult[totalCnt].M2 = null;
        combineResult[totalCnt].M3 = null;
        combineResult[totalCnt].M4 = null;
        combineResult[totalCnt].M5 = null;
        combineResult[totalCnt].M6 = null;
        combineResult[totalCnt].M7 = null;
        combineResult[totalCnt].M8 = null;

        combineResult[totalCnt].Tu1 = null;
        combineResult[totalCnt].Tu2 = null;
        combineResult[totalCnt].Tu3 = null;
        combineResult[totalCnt].Tu4 = null;
        combineResult[totalCnt].Tu5 = null;
        combineResult[totalCnt].Tu6 = null;
        combineResult[totalCnt].Tu7 = null;
        combineResult[totalCnt].Tu8 = null;

        combineResult[totalCnt].w1 = null;
        combineResult[totalCnt].w2 = null;
        combineResult[totalCnt].w3 = null;
        combineResult[totalCnt].w4 = null;
        combineResult[totalCnt].w5 = null;
        combineResult[totalCnt].w6 = null;
        combineResult[totalCnt].w7 = null;
        combineResult[totalCnt].w8 = null;

        combineResult[totalCnt].Th1 = null;
        combineResult[totalCnt].Th2 = null;
        combineResult[totalCnt].Th3 = null;
        combineResult[totalCnt].Th4 = null;
        combineResult[totalCnt].Th5 = null;
        combineResult[totalCnt].Th6 = null;
        combineResult[totalCnt].Th7 = null;
        combineResult[totalCnt].Th8 = null;

        combineResult[totalCnt].F1 = null;
        combineResult[totalCnt].F2 = null;
        combineResult[totalCnt].F3 = null;
        combineResult[totalCnt].F4 = null;
        combineResult[totalCnt].F5 = null;
        combineResult[totalCnt].F6 = null;
        combineResult[totalCnt].F7 = null;
        combineResult[totalCnt].F8 = null;

        element.forEach(element1 => {
            for(let i = element1.startTime; i<=elemennt1.finishTime; i++){
                if(element1.day === "월"){
                    if(i == 1){
                        
                    }
                }
            }
            if(combineResult[totalCnt])
        })
        totalCnt++;
    });
}