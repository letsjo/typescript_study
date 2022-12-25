// tsConfig: {"noImplicitAny":true,"strictNullChecks":true}
/*
  `el`은 `status`를 못 찾을 경우, `null` 일 가능성이 있어 에러가 발생한다.
  14번 줄과 같이 작성되어야한다.
*/

const el = document.getElementById('status');

el.textContent = 'Ready';
// ~~ Object is possibly 'null'

if (el) {
  el.textContent = 'Ready'; // OK, null has been excluded
}
el!.textContent = 'Ready'; // OK, we've asserted that el is non-null

export default {};
