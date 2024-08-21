let totalSubject
let totalClass
let cntCombine = 0;
let idx = 0;
let totalCnt = 1;
let shouldIncludeThis = [];
const rows = 5;
const columns = 8;
let timeTable = {};
let verify = 0;
let cntClass = 0;

document.getElementById("manual").addEventListener('click', function(){
    document.getElementById("manualTable").style.display = "block";
})

document.getElementById("close").addEventListener("click", function(){
    document.getElementById("manualTable").style.display = "none";
})

const classes = {}        ;     //수업 객체
const combineResult = {};     //시간표 조합 객체
const subject = [];            //수업들을 과목에 맞게 분리하여 저장하는 배열
const subjectName = [];

function addSubject(){
    //입력받은 값을 객체에 저장하고 페이지에 추가합니다
    const dataInclude =  document.getElementById("shouldInclude");
    const dataName =  document.getElementById("subjectName").value;
    const dataCode =  document.getElementById("subjectCode").value;
    const dataDay =  document.getElementById("subjectDay").value;
    const dataStartTime =  document.getElementById("subjectStartTime").value;
    const dataFinishTime =  document.getElementById("subjectFinishTime").value;

    const location = document.getElementById("classTableBody");

    const newRow = document.createElement('tr');

    const newRow1 = document.createElement("td");
    const newRow2 = document.createElement("td");
    const newRow3 = document.createElement("td");
    const newRow4 = document.createElement("td");
    const newRow5 = document.createElement("td");

    const checkBox = document.createElement("div");
    const name = document.createElement("div");
    const code = document.createElement("div");
    const day = document.createElement("div");
    const Time = document.createElement("div");
    
    let answer = dataInclude.checked ? "Y" : "N";
    checkBox.textContent = answer;
    const addResult = addClassToObject(dataName,dataCode,dataDay, dataStartTime, dataFinishTime, answer);


    name.textContent = dataName;
    code.textContent = dataCode;
    day.textContent = dataDay;
    let timeData = "";
    for(let i = dataStartTime; i<=dataFinishTime; i++){
        timeData += i;
    }
    Time.textContent = timeData;


    location.append(newRow);

    newRow.append(newRow1);
    newRow.append(newRow2);
    newRow.append(newRow3);
    newRow.append(newRow4);
    newRow.append(newRow5);


    newRow1.append(checkBox);
    newRow2.append(name);
    newRow3.append(code);
    newRow4.append(day);
    newRow5.append(Time);

}

function addClassToObject(dataName,dataCode,dataDay, dataStartTime, dataFinishTime, answer) {
    //과목을 객체에 추가합니다
    classes[idx] = {};
    classes[idx].name = dataName;
    classes[idx].id = dataCode;
    classes[idx].day = dataDay;
    classes[idx].startTime = dataStartTime;
    classes[idx].finishTime = dataFinishTime;
    classes[idx].check = answer;
    idx++;
    return classes[idx-1];
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


    const checkBox = document.createElement("div");
    const name = document.createElement("div");
    const code = document.createElement("div");
    const day = document.createElement("div");
    const time = document.createElement("div");
 
    if(dataInclude === "Y"){
        newRow.setAttribute("class", "selected");
    }
    checkBox.textContent = dataInclude;
    name.textContent = dataName;
    code.textContent = dataCode;
    day.textContent = dataDay;
    time.textContent = dataTime;

    location.append(newRow);

    newRow.append(newRow1);
    newRow.append(newRow2);
    newRow.append(newRow3);
    newRow.append(newRow4);
    newRow.append(newRow5);


    newRow1.append(checkBox);
    newRow2.append(name);
    newRow3.append(code);
    newRow4.append(day);
    newRow5.append(time);

    idx++;
}

function checkThisValid() { //필수여부가 유효한지 확인
    for(let k = 0; k<Object.keys(classes).length; k++){
        if(classes[k].check === "Y"){
            if (shouldIncludeThis.some(element => element.name === classes[k].name)) {
                alert("똑같은 과목이 있습니다! 다시 입력해주세요");
                window.location.reload();
                return;
            }
            if (shouldIncludeThis.some(element => {
                return element.day === classes[k].day &&
                       (element.startTime === classes[k].startTime || element.finishTime === classes[k].finishTime);
            })) {
                alert("동일 시간대에 필수과목을 한개 이상 선택했습니다! 다시 입력해주세요");
                window.location.reload();
                return;
            }
            else{shouldIncludeThis.push(classes[k])}
        }
    }
}
function modal() {
    document.getElementById("modal").style.display = "block";
    document.getElementById("overlay").style.display = "block";
    setTimeout(() => {
        makeTimeTable();
    }, 1);
}

function makeTimeTable() {  //시간표 조합만들기

    let idx = 0;
    
    checkThisValid();
    
    for(let i = 0; i<Object.keys(classes).length; i++){
        const data = classes[i];

        if (!subject[data.name]) {
            subject[data.name] = [];
            subjectName.push(data.name);
        }
        subject[data.name].push(data);     //수업들을 과목명으로 분리
    }

    for (let k = subjectName.length - 1; k > 0; k--) {
        const j = Math.floor(Math.random() * (k + 1));
        [subjectName[k], subjectName[j]] = [subjectName[j], subjectName[k]]; // 과목 순서를 랜덤으로 바꿈 -> 피셔에이츠 셔플알고리즘
    }

    
    subject[subjectName[0]].forEach(element1 => {
        let cacheTable = [];                             //조합을 위한 임시 테이블
        for(let i = 0; i<subjectName.length; i++){
            cacheTable[i] = classes[0];
        }
        shouldIncludeThis.forEach(element => {
            if(element.name != subjectName[0]){
                cacheTable[0] = element1;
            }
        });

        roop(1,cacheTable);
    });
    
    //계산이 끝나면 결과페이지로 이동
    
    document.getElementById("modal").style.display = "none";
    document.getElementById("overlay").style.display = "none";

    const resultBtn = document.createElement('button');
    resultBtn.setAttribute("id","goResultPage");
    resultBtn.addEventListener('click', function(){
        window.location.href = 'result.html';
        
    })
    resultBtn.textContent = "조합결과";
    document.getElementById("resultBox").append(resultBtn);
    sessionStorage.setItem('userData', JSON.stringify(classes));
    sessionStorage.setItem('userResultData', JSON.stringify(combineResult));
}

function roop(indx,cacheTable) {
    let checkVal = 0;
    shouldIncludeThis.forEach(element => {
        if(subjectName[indx] == element.name){
            checkVal ++;
        }
    });

    if(checkVal == 0){
        if(indx == subjectName.length-1){
            subject[subjectName[indx]].forEach(element => {
                cacheTable[indx] = element;
                timeTable = Array.from({ length: rows }, () => Array(columns).fill("0"));
                shouldIncludeThis.forEach(element1 => {
                    timeTable = fillTimeTable(element1,timeTable);
                });
    
                cacheTable.forEach(element2 => {
                    timeTable = fillTimeTable(element2,timeTable);
                });
    
                for(let z = 0; z < Object.keys(combineResult).length; z++){
                    if(JSON.stringify(combineResult[z]) === JSON.stringify(timeTable)){verify++;}
                }
    
                if(verify === 0 ){
                    if(cntClass == subjectName.length){
                        combineResult[cntCombine] = timeTable; cntCombine+=1;
                    }
                    cntClass = 0;
                }
                verify = 0;
            });
            return;
        }
        subject[subjectName[indx]].forEach(element => {
            cacheTable[indx] = element;
            roop(indx+1,cacheTable);
        });
    }

    else{
        if(indx == subjectName.length){return;}
        roop(indx+1,cacheTable);
    }
}

function fillTimeTable(data,timeTable){
    let scor = 0;
    for(let r = 0; r<timeTable.length; r++){
        for(let c = 0; c<timeTable[r].length; c++){
            if(timeTable[r][c].name === data.name){scor++;}
        }
    }

    if(scor == 0){
        if(data.day === "월"){
            let score = 0;
            for(let t = data.startTime; t <= data.finishTime; t++){
                if(timeTable[0][t-1] != 0){score++;}
            }
            if(score == 0){
                for(let z = data.startTime; z <= data.finishTime; z++){timeTable[0][z-1] = data;}
                cntClass+=1;
            }
        }
        else if(data.day === "화"){
            let score = 0;
            for(let t = data.startTime; t <= data.finishTime; t++){
                if(timeTable[1][t-1] != 0){score++;}
            }
            if(score == 0){
                for(let z = data.startTime; z <= data.finishTime; z++){timeTable[1][z-1] = data;}
                cntClass+=1;
            }
        }
        else if(data.day === "수"){
            let score = 0;
            for(let t = data.startTime; t <= data.finishTime; t++){
                if(timeTable[2][t-1] != 0){score++;}
            }
            if(score == 0){
                for(let z = data.startTime; z <= data.finishTime; z++){timeTable[2][z-1] = data;}
                cntClass+=1;
            }
        }
        else if(data.day === "목"){
            let score = 0;
            for(let t = data.startTime; t <= data.finishTime; t++){
                if(timeTable[3][t-1] != 0){score++;}
            }
            if(score == 0){
                for(let z = data.startTime; z <= data.finishTime; z++){timeTable[3][z-1] = data;}
                cntClass+=1;
            }
        }
        else if(data.day === "금"){
            let score = 0;
            for(let t = data.startTime; t <= data.finishTime; t++){
                if(timeTable[4][t-1] != 0){score++;}
            }
            if(score == 0){
                for(let z = data.startTime; z <= data.finishTime; z++){timeTable[4][z-1] = data;}
                cntClass+=1;
            }
        }
        
    }  
    return timeTable;
}
    
