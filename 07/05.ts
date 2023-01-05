/**
 * declare : 전역으로 값을 지정하는 것 (타입스크립트 언어)
 * 아래 `twelve` 값은 선언되지 않아서 자바스크립트 컴파일시 undefine으로 에러가 발생한다.
 */

type AB = 'A' | 'B'
type AB12 = 'A' | 'B' | 12
// OK, {"A", "B"} is a subset of {"A", "B"}:
const ab: AB = Math.random() < 0.5 ? 'A' : 'B'
const ab12: AB12 = ab // OK, {"A", "B"} is a subset of {"A", "B", 12}
declare let twelve: AB12

const back: AB = twelve
// ~~~~ Type 'AB12' is not assignable to type 'AB'
//        Type '12' is not assignable to type 'AB'

export default {}
