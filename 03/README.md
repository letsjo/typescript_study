# [아이템3] 코드 생성과 타입이 관계없음을 이해하기

![](https://velog.velcdn.com/images/gusdh2/post/6e48e44f-65c5-4fca-9fca-fdc6e2db4334/image.png)

타입스크립트 컴파일러는 두 가지 역할을 수행합니다.

- 최신 타입스크립트/자바스크립트를 브라우저에서 동작할 수 있도록 구버전의 자바스
  크립트로 트랜스파일(transpile) 합니다.
- 코드의 타입 오류를 체크합니다.

하지만 이 두 가지 역할은 서로 완벽하게 독립적으로 사용됩니다.

---

## 🚧 타입 오류가 있는 코드도 컴파일이 가능합니다.

간단한 예를 들어보겠습니다.

```ts
let x = 'hello';
// `x`값의 초기값이 `String`으로 입력되어 `x`의 타입을 `String`으로 자동 처리
x = 1234;
```

`x`값의 초기값이 `String`으로 입력되어 `x`값을 `String`으로 타입으로 처리되었지
만, 다시 `x`에 `number` 값을 넣으려고 하니 타입 체커에서 에러가 뜬 것입니다.

아래 코드가 에러는 떠있지만, 컴파일은 됩니다.

> 💡 컴파일과 타입체크
>
> 코드에 오류가 있을 때 `컴파일에 문제가 있다` 라고 말하는 경우를 보았을 것입니
> 다. 그러나 기술적으로는 틀린 말입니다. 엄밀히 말하자면 오직 코드 생성만이 '컴
> 파일' 이라고 할 수 있기 때문입니다. 작성한 타입스크립트가 유효한 자바스크립트
> 라면 타입스크립트 컴파일러는 컴파일을 해냅니다.
>
> 그래서 코드에 오류가 있을 때는 `타입 체크에 문제가 있다.`고 하는 것이 더 정확
> 한 표현법입니다.

만약 오류가 있을 때 컴파일이 되지 못하게 막을 수 도 있습니다.

컴파일까지 막으려면, ts 설정(`tsconfig.json`)을 하면 됩니다.

> `"noEmitOnError" : true` : 오류가 보고된 경우, 컴파일러 출력을 내보내지 않습니
> 다.

---

## 🚧 런타임에는 타입 체크가 불가능합니다.

```ts
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    // ~~~~~~~~~ 'Rectangle' only refers to a type,
    //           but is being used as a value here
    return shape.width * shape.height;
    //         ~~~~~~ Property 'height' does not exist
    //                on type 'Shape'
  } else {
    return shape.width * shape.width;
  }
}

export default {};
```

위 코드에서 `instanceof` 체크는 런타임에 일어나지만, `Rectangle`은 타입이기 때문
에 런타임 시점에서는 아무것도 하지 않습니다.

> 실제로 자바스크립트 컴파일 과정에서는 `모든 인터페이스`, `타입`, `타입 구문`은
> 제거되어 버립니다.
>
> 아래 자바스크립트로 컴파일된 코드를 확인해보면 제거되어 있습니다.

```js
// 위 TS 코드를 JS로 컴파일한 코드이다.
'use strict';
exports.__esModule = true;
function calculateArea(shape) {
  if (shape instanceof Rectangle) {
    // ~~~~~~~~~ 'Rectangle' only refers to a type,
    //           but is being used as a value here
    return shape.width * shape.height;
    //         ~~~~~~ Property 'height' does not exist
    //                on type 'Shape'
  } else {
    return shape.width * shape.width;
  }
}
exports['default'] = {};
```

`type Shape = Square | Rectangle;`의 타입 구문은 `태그된 유니온(tagged union)`의
한 예입니다. 런타임에 타입 정보를 손쉽게 유지할 수 있기 때문에, 이와 같은 코드는
타입스크립트에서 흔하게 볼수 있습니다.

다음 코드로 확인해보겠습니다.

```ts
interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;
function calculateArea(shape: Shape) {
  if ('height' in shape) {
    shape; // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape; // Type is Square
    return shape.width * shape.width;
  }
}

export default {};
```

위 코드는 `shape`의 변수는 위 `interface` 구문과 `type` 구문이 사라져도
`shape`가 매개변수(parameter)로 이미 선언되어 있기 때문에 에러를 발생하지 않게
됩니다.

또는 아래와 같이 `interface` 에 `kind`를 추가해서, 이 값이 `rectangle` 인지
`square` 인지 명확하게 해주면 해결할 수 있습니다.

```ts
interface Square {
  kind: 'square';
  width: number;
}
interface Rectangle {
  kind: 'rectangle';
  height: number;
  width: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape.kind === 'rectangle') {
    shape; // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape; // Type is Square
    return shape.width * shape.width;
  }
}

calculateArea({
  width: 100,
  kind: 'square',
});

calculateArea({
  height: 100,
  width: 100,
  kind: 'rectangle',
});
```

단, 위와 같은 코드일 경우 아래와 같이 반드시 `kind`도 함께 포함시켜서, 어떤 모양
의 종류인지 알려줘야합니다.

class 를 사용하여, 타입(런타임 접근 불가)과 값(런타임 접근 가능)을 둘 다 사용하
는 기법도 있습니다.

아래와 같이 타입을 클래스로 만들면 됩니다.

```ts
class Square {
  constructor(public width: number) {}
}
class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width);
  }
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    shape; // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape; // Type is Square
    return shape.width * shape.width; // OK
  }
}

export default {};
```

클래스(class)로 선언하면 타입과 값으로 모두 사용할 수 있습니다.

---

## 🚧 타입 연산은 런타임에 영향을 주지 않습니다.

아래 코드는 `string`과 `number` 타입을 받아 number 타입으로 바꾸는 것으로 의도했
지만, 실제로 컴파일해보면, `val` 값을 받아서 아무런 처리없이 `val`값으로 반환하
는 함수입니다.

```ts
function asNumber(val: number | string): number {
  return val as number;
}
```

아래는 위 코드를 자바스크립트로 컴파일한 코드입니다.

```js
'use strict';
exports.__esModule = true;
function asNumber(val) {
  return val;
}
exports['default'] = {};
```

즉, `as number`는 타입 연산이며, 타입스크립트 구문은 런타임 동작에는 아무런 영향
을 미치지 않습니다. (`as number`는 타입 단언문입니다.)

그래서 아래와 같이 자바스크립트 연산을 통해서 변환을 수행해야 합니다.

```js
function asNumber(val: number | string): number {
  return typeof val === 'string' ? Number(val) : val;
}

export default {};
```

---

## 🚧 런타입 타입은 선언된 타입과 다를 수 있습니다.

```ts
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
```

위 코드는 `console.log` 까지 실행될 수 있을까요?

본래 타입스크립트는 일반적으로 실행되지 못하는 죽은 코드를 찾아내지만, 여기서는
`strict`를 설정하더라도 찾아내지 못합니다.

여기서의 `: boolean`은 타입 선언문입니다. 타입 스크립트의 구문이기에 런타임시 제
거되기 때문에, 자바스크립트였다면 `setLightSwitch('on')` 으로 호출 할 수도 있었
을 것입니다.

그리고 순수 타입스크립트에서도 네트워크 호출로 값을 받아온 경우, 타입이 달라질
수도 있습니다.

```ts
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
```

`: LightApiResponse`를 통해서 boolean의 값으로 받아 올 것이라고 타입을 지정해놓
았지만, API를 잘못 파악했거나 배포 후에 API가 변경됬을 때, `LightApiResponse`가
문자열로 바뀌게 되는 경우가 있을 수 있다.

그렇기 때문에 선언된 타입이 언제든지 달라질 수 있다는 것을 명심해야 한다.

---

## 🚧 타입스크립트 타입으로는 함수를 오버로드할 수 없습니다.

타입과 런타임의 동작이 무관하기 때문에, 함수 오버로딩은 불가능하다.

```ts
function add(a: number, b: number) {
  return a + b;
}
// ~~~ Duplicate function implementation
function add(a: string, b: string) {
  return a + b;
}
// ~~~ Duplicate function implementation

export default {};
```

타입스크립트가 함수 오버로딩 기능을 지원하기는 하지만, 온전히 타입 수준에서만 동
작을 합니다.

아래와 같이 코딩할 경우, 오류 없이 오버로딩이 가능하긴 합니다.

```ts
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: boolean, b: boolean): number;

function add(a: any, b: any) {
  return a + b;
}

const three = add(1, 2); // Type is number
const twelve = add('1', '2'); // Type is string
const thirteen = add(true, false); // Type is number

export default {};
```

## 🚧 타입스크립트 타입은 런타임 성능에 영향을 주지 않습니다.

- 타입과 타입 연산자는 자바스크립트 변환 시점에서 제거되기 때문에, 런타임에 아무
  런 영향을 주지 않습니다.
- 타입스크립트의 정적 타입은 실제로 비용이 전혀 들지 않습니다.
