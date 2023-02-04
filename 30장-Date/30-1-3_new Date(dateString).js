// 입력한 dateString 은 KST 로 해석됩니다.
const myDate1 = new Date('2023-01-20 10:25:30');

// 2023-01-20T01:25:30.000Z
// => console.log 에 출력된 값은 UTC 입니다.
console.log('myDate1: ', myDate1);



// 입력한 dateString 은 KST 로 해석됩니다.
const myDate2 = new Date('2023/02/03 14:10:55');

// 2023-02-03T05:10:55.000Z
// => console.log 에 출력된 값은 UTC 입니다.
console.log('myDate2: ', myDate2);
