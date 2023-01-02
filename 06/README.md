# [아이템6] 편집기를 사용하여 타입 시스템 탐색하기

타입스크립트의 가장 중요한 역할은 타입 시스템에 있습니다. 타입스크립트는 단독으
로 실행할 수 있는 타입스크립트 서버(tsserver)를 사용하며, 언어서비스를 제공합니
다.

### 🔶 타입스크립트가 타입을 어떻게 판단 하는지 확인할 수 있다.

`num` 변수의 타입을 `number`라고 직접 지정하지는 않았지만, 타입스크립트는 `10`이
라는 값을 보고 그 타입을 알아냅니다.

![](https://velog.velcdn.com/images/gusdh2/post/adf6a3bd-5eb8-4162-b36e-f6279bbde180/image.png)

### 🔶 타입스크립트는 함수의 타입을 추론할 수 있습니다.

반환 타입을 명시하지 않았지만, `number`로 추론하고 있습니다.

![](https://velog.velcdn.com/images/gusdh2/post/4dee7e1e-9170-4902-9576-c27056833e33/image.png)

만약 타입이 기대한 것과 다르다면 타입 선언을 직접 명시하고, 문제점을 파악해야할
것 입니다.

### 🔶 조건문을 이용해서 타입을 추론합니다.

`message` 값이 조건문 외부에서는 `String` 또는 `null` 타입이겠지만, 조건문 내부
에서는 `String` 이라고만 추론합니다.

![](https://velog.velcdn.com/images/gusdh2/post/70b5dcb3-4e29-44a8-8a5a-cd2484a836c1/image.png)

### 🔶 객체 내 값들도 타입을 추론합니다.

`x`가 튜플타입(`[number, number, number]`) 이어야 한다면, 타입 구문을 명시해야합
니다.

![](https://velog.velcdn.com/images/gusdh2/post/a24ddda7-2fbf-4a13-8576-7ea5b3ce3bd6/image.png)

### 🔶 연속된 메서드 호출에서 추론된 제너릭 타입을 조사합니다.

만약 길게 체이닝된 메서드 호출에서 추론 정보는 디버깅하는데 꼭 필요한 존재입니다
.

![](https://velog.velcdn.com/images/gusdh2/post/dad37271-1aa8-4ed1-ab35-01fbb59a7017/image.png)

### 🔶 타입 추론으로 오류를 찾아낼 수 있습니다.

아래 코드의 경우 타입이 `HTMLElement` 로 반환되는 것을 기대하고 있습니다.

```ts
function getElement(elOrId: string | HTMLElement | null): HTMLElement {
  // const a = typeof null
  // null이 object 이기도 하기 때문에 return 값이 에러가 뜬다.
  if (typeof elOrId === 'object') {
    return elOrId;
    // ~~~~~~~~~~~~~~ 'HTMLElement | null' is not assignable to 'HTMLElement'
  } else if (elOrId === null) {
    return document.body;
  } else {
    const el = document.getElementById(elOrId);
    return el;
    // ~~~~~~~~~~ 'HTMLElement | null' is not assignable to 'HTMLElement'
  }
}
```

하지만 `return elOrId` 과 `return el` 에서 에러가 발생할 것입니다.

![](https://velog.velcdn.com/images/gusdh2/post/5334d278-8460-42b2-8d9d-78a765ffa537/image.png)

위에서 확인할 수 있 듯이 `null`값도 `object` 타입으로 `return elOrId`에서 `null`
이 반환할 수 있기 때문입니다.

`const el = document.getElementById(elOrId)` 값 역시도 `null`값이 있을 수도 있기
때문에 `return el`에서도 에러가 발생된 것 입니다.

### 🔶 라이브러리의 타입 선언을 탐색할 때도 도움이 됩니다.

코드 내 `fetch` 함수가 호출되고, 이 함수에 대해서 좀 더 알아본다고 가정해봅시다.

![](https://velog.velcdn.com/images/gusdh2/post/d57ed2c4-e9d9-494f-9cca-49a95116749e/image.png)

마우스를 `fetch`위에 되게되면 타입을 확인할 수 있으며,
'`Go to Definition(정의로 이동)`' 옵션을 확인하거나, '`F12`' 또는 '`Ctrl` + 마우
스클릭'을 하게 되면 타입스크립트에 포함되어 있는 DOM 타입 선언인
`lib.dom.d.ts`로 이동합니다.

```ts
declare function fetch(
  input: RequestInfo | URL,
  init?: RequestInit,
): Promise<Response>;
```

`RequestInfo`과 `RequestInit` 타입으로 명시되어 있으며, 위와 동일한 방법으로 타
입 확인을 할 수 있습니다.

## 📖 정리

- 편집기에서 타입스크립트 언어 서비스를 적극 활용해야합니다.
- 편집기를사용하면 어떻게 타입 시스템이 동작하는지, 그리고 타입스크립트가 어떻게
  타입을 추론하는지 알 수 있게 되었습니다.
- 타입스크립트가 동작을 어떻게 모델링하는지 알기 위해 타입 선언 파일을 찾아보는
  방법을 터득해야 합니다.
