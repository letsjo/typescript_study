interface Identified {
  id: string;
}
interface Person {
  name: string;
  job: string;
  birth: Date;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}
type PersonSpan = Person & Lifespan;
type TT = keyof (Person | Lifespan); // Person 과 Lifespan 의 교집합 (TT Type is never)
type A = Person & Lifespan; // Person 타입과 Lifespan 타입에 모두 충족되어야한다.
type T = Person | Lifespan; // Person 타입에 충족되거나, Lifespan 타입에 충족되어야한다.

const a: T = {
  death: new Date(),
}; // 두 타입 중 하나도 충족하지 않아서 타입 오류

const b: T = {
  birth: new Date(),
  death: new Date(),
}; // OK

const c: A = {
  birth: new Date(),
  death: new Date(),
}; // 두 타입 모두 충족하지 않아서 타입 오류

/*
아래와 값이 동일하다.

keyof ( A & B ) = (keyof A) | (keyof B)
keyof ( A | B ) = (keyof A) & (keyof B)
*/

export default {};
