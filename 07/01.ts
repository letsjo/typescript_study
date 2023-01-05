// `never` 타입으로 선언된 변수의 범위는 공집합이기 때문에 아무런 값을 할당 할 수 없습니다.
// `never` 타입의 경우에는 에러 객체와 같이 도달하면 안되는 곳에 보통 할당합니다.
const x: never = 12;
// ~ Type '12' is not assignable to type 'never'

export default {};
