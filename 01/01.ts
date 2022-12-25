/* 
  아이템1. 타입스크립트와 자바스크립트의 관계 이해하기
  - `모든 자바스크립트`는 `타입 스크립트`에 속한다는 참이지만, 반대는 성립하지 않는다.
  
  예) node 01/01.ts 로 실행시, :string 구문은 자바스크립트 구문이 아니기 때문에, 오류가 발생함.
*/

function greet(who: string) {
  console.log('Hello', who);
}

greet('FE');
