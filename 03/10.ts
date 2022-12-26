// tsConfig: {"noImplicitAny":false}
/**
 * 타입스크립트가 함수 오버로딩 기능을 지원하기는 하지만, 온전히 타입 수준에서만 동작을 한다.
 * 
 * 아래와 같이 코딩할 경우, 오류 없이 오버로딩이 가능하긴 하다.
 */

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: boolean, b: boolean): number;

function add(a: any, b: any) {
  return a + b;
}

const three = add(1, 2); // Type is number
const twelve = add('1', '2'); // Type is string
const thirteen = add(true, false); // Type is number

export default {};
