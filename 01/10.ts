/*
  반대로 런타임 오류가 발생하지 않는 코드인데 타입 체커에서는 문제점을 표시하기도 한다.
 */

const a = null + 7; // 출력: 숫자 7
// ~~~~ Operator '+' cannot be applied to types ...
const b = [] + 12; // 출력: 문자열 "12"
// ~~~~~~~ Operator '+' cannot be applied to types ...
alert('Hello', 'TypeScript'); // "Hello" 로 경고 표시
// ~~~~~~~~~~~~ Expected 0-1 arguments, but got 2
