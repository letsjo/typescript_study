/**
 * # 타입스크립트 타입으로는 함수를 오버로드할 수 없습니다.
 *
 * 타입과 런타임의 동작이 무관하기 때문에, 함수 오버로딩은 불가능하다.
 */

function add(a: number, b: number) {
  return a + b;
}
// ~~~ Duplicate function implementation
function add(a: string, b: string) {
  return a + b;
}
// ~~~ Duplicate function implementation

export default {};
