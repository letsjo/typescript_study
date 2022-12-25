// tsConfig: {"noImplicitAny":true}
/*
  "noImplicitAny": `true`일 경우 `any` 타입을 에러로 출력한다.

  아래 코드는 에러가 발생하지 않으며,
  매개변수 number 와 number가 더해져서 반환값도 number 라고 예상한다.
*/

function add(a: number, b: number) {
  return a + b;
}

export default {};
