// 로컬 스토리지에서 데이터를 가져옵니다.
const storedData = sessionStorage.getItem('userData');
const storedResultData = sessionStorage.getItem('userResultData');

const classes = JSON.parse(storedData);
const combineResult = JSON.parse(storedResultData);

const howMany = document.getElementById("howMany");
howMany.textContent = Object.keys(combineResult).length + "개의 조합이 있어요!";

for(let i = 0; i<Object.keys(combineResult).length; i++){
    makeDiv(combineResult[i],i+1);
}

function makeDiv(data , num) {
    const location = document.getElementById("resultSection");
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    location.appendChild(table);
    table.setAttribute("class", "resultTimeTable");
    table.appendChild(thead);
    table.appendChild(tbody);
    table.style.backgroundColor = "rgb(255, 255, 255)";
    table.style.padding = "5px";
    table.style.borderRadius = "5px";

    for(let i = 0; i<6; i++){
        const day = [num + " 번째","월","화","수","목","금"];
        const th = document.createElement('th');
        th.setAttribute('class', `th${i}`);
        th.textContent = day[i];
        thead.appendChild(th);
        th.style.backgroundColor = "rgba(12, 22, 44, 0.77)";
        th.style.fontWeight = "500";
        th.style.height = "60px";
    }

    for(let i = 0; i<8; i++){
        const tr = document.createElement('tr');
        tr.setAttribute('id', `tr${i}`);
        tbody.appendChild(tr);

        for(let k = 0; k<6; k++){
            const td = document.createElement('td');
            tr.append(td);
            if(k==0){td.textContent = i+1; 
                td.style.color = "white";
                td.style.backgroundColor = "rgba(12, 22, 44, 0.7)" ;
            }
            else{
                if(data[k-1][i] !== '0'){
                    td.textContent = data[k-1][i].name + " (" +data[k-1][i].id + ")" ;
                    td.style.backgroundColor = data[k-1][i].color;
                    td.style.borderRadius = "4px";
                }
            }td.style.height = "60px";
        }
        
    }
}