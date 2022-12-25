// tsConfig: {"noImplicitAny":true}
/* 
  "noImplicitAny": `true`일 경우 `any` 타입을 에러로 출력한다.

  매개변수 `a` 와 `b` 타입 지정이 안되어있기 때문에 타입이 `any`로 자동 지정된다.
*/

function add(a, b) {
  // ~    Parameter 'a' implicitly has an 'any' type
  //    ~ Parameter 'b' implicitly has an 'any' type
  return a + b;
}

export default {};
