/**
 * 일반적으로는 extends 키워드를 사용한다.
 */

interface Person {
  name: string
}
interface PersonSpan extends Person {
  birth: Date
  death?: Date
}

export default {}
