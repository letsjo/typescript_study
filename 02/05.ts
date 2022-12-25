// tsConfig: {"noImplicitAny":true,"strictNullChecks":false}
/*
  "strictNullChecks" : false일 때, null/undefined/NaN 을 할당해도 에러가 발생하지 않는다. 
*/

const x: number = null; // OK, null is a valid number

export default {};
