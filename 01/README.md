# [아이템1] 타입스크립트와 자바스크립트의 관계 이해하기

## 1. 모든 자바스크립트는 타입 스크립트에 속한다.

![](https://velog.velcdn.com/images/gusdh2/post/239ded4b-82d0-4ecd-a31b-216d5514c586/image.png)

- 위 그림과 같이 모든 자바스크립트는 타입스크립트에 속해있다.
- 다만, 반대는 성립하지 않는다.

>다시 말해서, 타입스크립트는 자바스크립트의 상위 집합이다.

아래 코드의 경우 `node 01.ts` 로 실행 시에는, `:string` 구문은 자바스크립트 구문이 아니기 때문에, 오류가 발생하게 된다.
```js
function greet(who: string) {
  console.log('Hello', who);
}

greet('FE');
```

## 2. 타입스크립트는 자바스크립트의 런타임 오류를 발생시키는 코드를 찾아내려고 한다.

- 타입 스크립트는 초깃값으로부터 타입을 추론하여, 타입스크립트의 타입 체커가 미리 코드의 문제점을 찾아냅니다.
- 다만, 모든 오류를 찾아내리라 기대하면 안된다.

![](https://velog.velcdn.com/images/gusdh2/post/2590716f-bc27-4128-8e1e-1961c23b91c9/image.png)

아래 코드를 확인해보면, 타입스크립트에서는 `toUppercase`가 `toUpperCase`로 변경할 수 있도록 런타임 전에 미리 오류를 발생시킨다.

```js
let city = 'new york city';
console.log(city.toUppercase());
```

이렇듯 타입스크립트에서는 의도대로 실행될 수 있도록 오류를 발생시킨다.

아래 코드도 확인해보자.

```js
const states = [
  { name: 'Alabama', capital: 'Montgomery' },
  { name: 'Alaska', capital: 'Juneau' },
  { name: 'Arizona', capital: 'Phoenix' },
  // ...
]
for (const state of states) {
  console.log(state.capitol)
}
```

위 코드는 유효한 자바스크립트이며, 어떠한 오류도 없이 실행되는 코드이다.

그러나 for문 내의 `state.capitol` 은 의도한 코드가 아닌게 분명하다.
이러한 경우에 타입스크립트의 타입 체커에서는 추가적인 타입 구문없이도 오류(`'capital'을(를) 사용하시겠습니까?`)를 발생시킨다. 

하지만 아래와 같은 코드는 어떠한가?

```js
const states6 = [
  { name: 'Alabama', capitol: 'Montgomery' },
  { name: 'Alaska', capitol: 'Juneau' },
  { name: 'Arizona', capitol: 'Phoenix' },
];

for (const state of states6) {
  console.log(state.capital);
}
```
`capitol` 이라고 했지만, `capital`이 `capitol`로 수정하기를 권장한다.

개발자의 의도는 `capital` 이고, 오타는 `capitol`이지만, `capitol` 로 수정을 권장하기 때문에 어느 쪽이 오타인지는 판단하지 못한다.

----

그렇기 때문에 아래와 같이 `interface`를 이용해 `states`를 선언하여 의도를 분명하게 하는 것이 좋다.

```ts
interface State {
  name: string;
  capital: string;
}

const states7: State[] = [
  { name: 'Alabama', capitol: 'Montgomery' },
  { name: 'Alaska', capitol: 'Juneau' },
  { name: 'Arizona', capitol: 'Phoenix' },
];
for (const state of states7) {
  console.log(state.capital);
}
```

## 3. 자바스크립트에서는 런타임 오류가 발생하지 않지만, 타입스크립트에서는 오류가 나기도 한다.

```js
const a = null + 7; 
// JS 출력: 숫자 7
// TS 에러: The value 'null' cannot be used here.

const b = [] + 12; 
// JS 출력: 문자열 "12"
// TS 에러: Operator '+' cannot be applied to types 'never[]' and 'number'.

alert('Hello', 'TypeScript'); 
// JS 실행 : "Hello" 로 경고 표시
// TS 에러 :  Expected 0-1 arguments, but got 2.
```

## 4. 타입 체커를 통과하면서 런타임 오류 를 발생 시키는 코드는 충분히 존재한다.

```ts
const names = ['Alice', 'Bob'];
console.log(names[2].toUpperCase());
```
배열 2번째 index가 없어 에러가 나는 구문인데, 타입 체커에서 에러를 발생시키지 않는다.

타입스크립트는 앞의 배열이 범위 내에서 사용될 것이라 가정했지만,
실제로는 그렇지 않았고, 런타임 오류가 발생했다.

---
