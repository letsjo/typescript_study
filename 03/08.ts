/**
 * 아래와 같이 네트워크 호출로 부터 값을 받아본 경우,
 * `: LightApiResponse`를 통해서 boolean의 값으로 받아 올 것이라고 타입을 지정해놓았다.
 *
 * 하지만 API를 잘못 파악했거나 배포 후에 API가 변경됬을 경우,
 * `LightApiResponse`가 문자열로 바뀌게 되는 경우가 있을 수 있다.
 *
 * 그렇기 때문에 선언된 타입이 언제든지 달라질 수 있다는 것을 명심해야 한다.
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
interface LightApiResponse {
  lightSwitchValue: boolean;
}
async function setLight() {
  const response = await fetch('/light');
  const result: LightApiResponse = await response.json();
  setLightSwitch(result.lightSwitchValue);
}

export default {};
