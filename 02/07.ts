// tsConfig: {"noImplicitAny":true,"strictNullChecks":true}
/*
  null 을 허용하기 위해서는, 아래와 같이 의도를 명시적으로 드러냄으로써 오류를 고칠 수 있다.
*/

const x: number | null = null;
// x의 타입은 number 이거나 null 이다.
