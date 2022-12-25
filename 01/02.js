/*
  city 변수가 문자열이라는 것을 알려주지 않아도 타입 스크립트는 초깃값으로부터 타입을 추론합니다.

  앞에 코드에는 타입 구문이 없지만, 타입스크립트의 타입 체커는 문제점을 찾아냅니다.

  `toUppercase` 가 `toUpperCase`로 고칠 수 있도록 미리 문제점을 찾아냅니다.
  그래서 런타임에 오류를 발생시킬 코드를 미리 찾아내게 된다. [03.ts 참고]
*/

let city = 'new york city'
console.log(city.toUppercase())

export default {}
