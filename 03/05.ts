/**
 * # 타입 연산은 런타임에 영향을 주지 않습니다.
 *
 * 아래 코드는 `string`과 `number` 타입을 받아 number 타입으로 바꾸는 것으로 의도했지만,
 * 실제로 컴파일(참고 03/05.js)해보면, `val` 값을 받아서 아무런 처리없이 `val`값으로 반환하는 함수이다.
 * 
 * as number는 타입 연산이고, 런타임 동작에는 아무런 영향을 미치지 않는다.
 * (`as number`는 타입 단언문이다.)
 */

function asNumber(val: number | string): number {
  return val as number;
}

export default {};
