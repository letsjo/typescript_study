// tsConfig: {"noImplicitAny":false,"strictNullChecks":false}

/*
  1. 타입 체커 커맨드 라인에서 사용하기

  `$ tsc --noImplicitAny 02/01.ts`

  2. (권장) 타입스크립트 설정은 `tsconfig.json`에서도 설정 할 수 있다.
  현 시점에서 타입스크립트 설정은 거의 100개 이상이다.
*/

function add(a, b) {
  return a + b;
}
add(10, null);

export default {};
