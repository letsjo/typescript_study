/**
 * # 타입 오류가 있는 코드도 컴파일이 가능합니다.
 * 
 * `x`값의 초기값이 `String`으로 입력되어 `x`값을 `String`으로 타입으로 처리되었지만,
 * 다시 `x`에 `number` 값을 넣으려고 하니 타입 체커에서 에러가 뜬 것이다.
 *
 * 아래 코드가 에러는 떠있지만, 컴파일 `tsc 03/00.ts`은 된다.
 *
 * 컴파일까지 막으려면, 아래와 같이 ts 설정(tsconfig.json)을 하면 된다.
 * "noEmiOnError" : true,
 */

let xy : string = 'hello';
xy = 1234;
