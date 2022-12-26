/**
 * 그래서 아래와 같이 자바스크립트 연산을 통해서 변환을 수행해야 한다.
 */

function asNumber(val: number | string): number {
  return typeof val === 'string' ? Number(val) : val;
}

export default {};
