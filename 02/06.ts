// tsConfig: {"noImplicitAny":true,"strictNullChecks":true}
/*
  "strictNullChecks" : true일 때, null/undefined/NaN 을 할당할 경우 에러로 출력하도록 한다. 
*/

const x: number = null;
//    ~ Type 'null' is not assignable to type 'number'
