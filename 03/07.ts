/**
 * # 런타입 타입은 선언된 타입과 다를 수 있습니다.
 * 
 * console.log 까지 실행될 수 있을까?
 *
 * 타입스크립트는 일반적으로 실행되지 못하는 죽은 코드를 찾아내지만,
 * 여기서는 strict를 설정하더라도 찾아내지 못합니다.
 *
 * 여기서의 `: boolean`은 타입 선언문이다. 타입 스크립트의 구문이기에 런타임시 제거된다.
 * 그렇기 때문에 자바스크립트였다면, `setLightSwitch('on')` 으로 호출 할 수도 있었을 것이다.
 */

function turnLightOn() {}
function turnLightOff() {}
function setLightSwitch(value: boolean) {
  switch (value) {
    case true:
      turnLightOn();
      break;
    case false:
      turnLightOff();
      break;
    default:
      console.log(`I'm afraid I can't do that.`);
  }
}

export default {};
