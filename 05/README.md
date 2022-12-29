# [아이템5] any 타입 지양하기

타입스크립트는 코드 타입을 조금씩 추가할 수 있기 때문에 **점진적**이다. 그리고
언제든지 타입 체커를 해제할 수 있기 때문에 **선택적**이다.

이 기능들의 핵심은 `any` 타입이다.

```ts
let age: number;
age = '12';
// ~~~ Type '"12"' is not assignable to type 'number'
age = '12' as any; // OK
```

타입 체커를 통해서 앞의 코드에서 오류를 찾아냈습니다. 그래서 위 코드와 같이
`as any`를 사용하게 된다면, 쉽게 해결할 수 있습니다. 만약 타입 오류로 인해서 시
간을 쏟고 싶지않아서 `any` 타입이나 타입 단언문(`as any`)을 사용하게 된다면, 수
많은 장점을 누릴 수 없게 됩니다.

그래서 부득이하게 `any`를 사용하더라도 그 위험성은 알고 있어야 합니다.

## 🚧 any 타입에는 타입 안전성이 없습니다.

위 예제 코드에서 `age`는 처음 `number` 타입으로 선언되었습니다. 그러나
`as any`를 사용하면 `string` 타입을 할당 할 수 있게 됩니다. 타입 체커는 선언에
따라 `number`로 판단 할 것이고, 아래 예제 코드와 같이 혼돈은 걷잡을 수 없게 됩니
다.

```ts
let age: number;
age = '12';
// ~~~ Type '"12"' is not assignable to type 'number'
age = '12' as any; // OK
age += 1; // OK; at runtime, age is now "121"
```

## 🚧 any는 함수 시그니처를 무시해 버립니다.

함수를 작성할 때는 시그니처를 명시해야 합니다.

```ts
let age: number;
age = '12';
// ~~~ Type '"12"' is not assignable to type 'number'
age = '12' as any; // OK
function calculateAge(birthDate: Date): number {
  // COMPRESS
  return 0;
  // END
}

let birthDate: any = '1990-01-19';
calculateAge(birthDate); // OK
```

위 코드에서 `birthDate` 매개변수는 `string`이 아닌 `Date` 타입이어야 합니다.
`any` 타입을 사용하면 `calculateAge` 의 시그니처를 무시하게 됩니다. 그래서 의도
하지 않은 값을 출력하여, 문제가 발생시 오류를 잡기가 어렵게 될 것입니다.

## 🚧 any 타입에는 언어 서비스가 적용되지 않습니다.

심벌에 타입이 있다면, 타입스크립트는 자동완성 기능과 적절한 도움말을 제공합니다.

![](https://velog.velcdn.com/images/gusdh2/post/d879ce17-6300-4d77-a273-fe0d4d46a9cb/image.png)

하지만 `any`타입의 경우에는 아래와 같이 아무런 도움을 받지 못합니다.

![](https://velog.velcdn.com/images/gusdh2/post/026c757e-392c-4ac2-8eb9-0044dbec0ca3/image.png)

그 외에 제공하는 언어 서비스들도 누릴 수 없습니다.

![](https://velog.velcdn.com/images/gusdh2/post/112bca94-766c-45da-8ee7-91e53d0e6fbb/image.png)

아래 `formatNameAny`의 경우, 매개변수 `p`가 any로 선언되었기 때문에 `last` 선택
시 `formatNameAny`의 `last`는 선택이 되지 않게 된다.

타입스크립트의 모토는 '확장 가능한 자바스크립트'입니다. '확장'의 중요한 요소인 '
언어 서비스'를 제대로 사용할 수 있어야 생산성이 더욱 향상 될 수 있습니다.

## 🚧 any 타입은 코드 리펙터링 때 버그를 감춥니다.

```ts
interface ComponentProps {
  onSelectItem: (item: any) => void;
}
function renderSelector(props: ComponentProps) {
  /* ... */
}

let selectedId: number = 0;
function handleSelectItem(item: any) {
  selectedId = item.id;
}

renderSelector({ onSelectItem: handleSelectItem });
```

우선 위 코드에서 `handleSelectItem`에서 `id`만 필요하기 때문에, 아래 코드와 같이
필요한 부분만 전달하도록 `ComponentProps`를 개선해보았습니다.

```ts
interface ComponentProps {
  onSelectItem: (id: number) => void;
}
```

`handleSelectItem`은 `any`의 매개변수를 받아 `id`를 전달받아도 문제없다고 나옵니
다. `id`를 전달 받으면, 타입 체커를 통과함에도 불구하고 런타임에는 오류가 발생할
겁니다. `any`가 아니라 구체적인 타입을 사용했다면, 타입 체커가 오류를 발생했을
겁니다.

## 🚧 any는 타입 설계를 감춰버립니다.

상태 객체안에 있는 수많으 속성의 타입을 일일이 작성해야하는데 꽤나 복잡해서, 이
때 `any` 타입을 사용한다면 간단하게 끝내버릴 수도 있습니다.

하지만 이 때도 `any` 사용하시면 안됩니다. 깔끔하고 정확하고 명료한 코드 작성을
위해서는 제대로된 타입 설계는 필수입니다. `any` 타입을 사용하게 된다면, 타입 설
계가 불분명해지게 됩니다.

## 🚧 any는 타입시스템의 신뢰도를 떨어뜨립니다.

타입 체커가 실수를 잡아주고 코드의 신뢰도를 높여주게 됩니다. 하지만 `any` 타입을
사용하게 되어, 런타임에 타입 오류를 발견하게 된다면, 타입 체커를 신뢰할 수 없게
됩니다.

타입스크립트는 개발자의 삶을 편하게 하는데 목적이 있지만, `any` 타입을 사용함으
로 인해서 자바스크립트보다 일이 더 어렵게 만들기도 합니다.

어쩔수 없이 `any` 타입을 써야만 하는 상황도 있습니다. 이럴 때 `any`의 단점을 보
안하여, 사용할 수 있도록 해야합니다.
