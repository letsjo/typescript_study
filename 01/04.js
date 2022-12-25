/* 
  아래코드는 유효한 자바스크립트이며, 어떠한 오류도 없이 실행되는 코드이다.

  그러나 루프 내의 state.capitol 은 의도한 코드가 아닌게 분명하다.
  이러한 경우에 타입스크립트의 타입 체커는 추가적인 타입 구문없이도 오류를 발생시킨다. [05.ts 참고]
*/

const states = [
  { name: 'Alabama', capital: 'Montgomery' },
  { name: 'Alaska', capital: 'Juneau' },
  { name: 'Arizona', capital: 'Phoenix' },
  // ...
]
for (const state of states) {
  console.log(state.capitol)
}