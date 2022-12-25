/*
  다른 언어였다면 런타임 오류가 될 만한 코드이다.
  하지만 타입스크립트의 타입 체커는 정상적으로 인식한다.
  두 줄 모두 '23'이 되는 자바스크립트 런타입 동작으로 리모델링 된다.
*/

const x = 2 + '3'; // OK, type is string
const y = '2' + 3; // OK, type is string

console.log(x, y);
