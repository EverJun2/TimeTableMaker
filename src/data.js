// 로컬 스토리지에서 데이터를 가져옵니다.
const storedData = sessionStorage.getItem('userData');
const storedResultData = sessionStorage.getItem('userResultData');

const classes = JSON.parse(storedData);
const combineResult = JSON.parse(storedResultData);
