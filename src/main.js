let totalSubject
let totalClass
let idx = 0;
let totalCnt = 1;

const classes = {}        ;     //과목 객체
const combineResult = {};     //시간표 조합 객체

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
    const rows = 5;
    const columns = 8;

    // for(let i = 0; i<Object.keys(classes).length; i++){
        const data = classes[0];
        let timeTable = Array.from({ length: rows }, () => Array(columns).fill("0"));
        combineResult[0] = {};

        timeTable = fillTimeTable(data,timeTable);
        for(let i = 1; i<Object.keys(classes).length; i++){
            timeTable = fillTimeTable(classes[i],timeTable);
        }

        combineResult[0] = timeTable;
    // }
}

function fillTimeTable(data,timeTable){
    let scor = 0;
    for(let r = 0; r<timeTable.length; r++){
        for(let c = 0; c<timeTable[r].length; c++){
            if(timeTable[r][c].name === data.name){scor++;}
        }
        console.log(scor);
    }

    if(scor == 0){
        if(data.day === "월"){
            let score = 0;
            for(let t = data.startTime; t <= data.finishTime; t++){
                if(timeTable[0][t-1] != 0){score++;}
            }
            if(score == 0){
                for(let z = data.startTime; z <= data.finishTime; z++){timeTable[0][z-1] = data;}
            }
        }
        else if(data.day === "화"){
            let score = 0;
            for(let t = data.startTime; t <= data.finishTime; t++){
                if(timeTable[1][t-1] != 0){score++;}
            }
            if(score == 0){
                for(let z = data.startTime; z <= data.finishTime; z++){timeTable[1][z-1] = data;}
            }
        }
        else if(data.day === "수"){
            let score = 0;
            for(let t = data.startTime; t <= data.finishTime; t++){
                if(timeTable[2][t-1] != 0){score++;}
            }
            if(score == 0){
                for(let z = data.startTime; z <= data.finishTime; z++){timeTable[2][z-1] = data;}
            }
        }
        else if(data.day === "목"){
            let score = 0;
            for(let t = data.startTime; t <= data.finishTime; t++){
                if(timeTable[3][t-1] != 0){score++;}
            }
            if(score == 0){
                for(let z = data.startTime; z <= data.finishTime; z++){timeTable[3][z-1] = data;}
            }
        }
        else if(data.day === "금"){
            let score = 0;
            for(let t = data.startTime; t <= data.finishTime; t++){
                if(timeTable[4][t-1] != 0){score++;}
            }
            if(score == 0){
                for(let z = data.startTime; z <= data.finishTime; z++){timeTable[4][z-1] = data;}
            }
        }
        
    }  
    return timeTable;
}
    
