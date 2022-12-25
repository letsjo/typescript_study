# [아이템2] 타입스크립트 설정 이해하기

![](https://velog.velcdn.com/images/gusdh2/post/65805ddf-b91a-4243-9015-7ae8d9ce1d74/image.png)

타입스크립트 컴파일러는 매우 많은 설정을 가지고 있습니다. 현 시점에서 타입스크립트 설정은 거의 100개 이상 이릅니다.

먼저 설정 사용방법에 대해서 알아보겠습니다.

---

## ⚙️ 설정 사용 방법

### 1. 커맨드 라인에서 설정 사용하기

```
$ tsc --noImplicitAny 02/01.ts
```


### 2. tsconfig.json 파일 통해 사용하기
```ts
{
	"compilerOptions": {
    	"noImplicitAny": true,
    }
}
```

가급적 설정 파일(`tsconfig.json`)을 사용하는 것이 좋습니다. 그래야만 타입 스크립트를 어떻게 사용할 것인지 동료들이나 다른 도구 들이 알 수 있습니다.

> 설정 파일은 `tsc --init` 을 실행하면 간단하게 생성됩니다.

---

## 🔧 설정을 활용해보기

> "noImplicitAny": `true`일 경우 `any` 타입을 에러로 출력한다.
> "noImplicitAny": `false`일 경우 `any` 타입을 에러로 출력하지 않는다.

아래 코드의 경우, 매개변수 `a` 와 `b` 타입 지정이 안되어있기 때문에 타입이 `any`로 자동 지정됩니다.

```ts
function add(a, b) {
  return a + b;
}
```

"noImplicitAny"이 `true`일 경우, 에러로 출력하게 됩니다.

아래 코드를 확인해 봅시다.

```ts
function add(a: number, b: number) {
  return a + b;
}
```
매개변수 `number` 와 `number`가 더해져서 반환값도 `number` 라고 예상하기 때문에, 위 코드는 에러가 발생하지 않게 됩니다.

---

>`strictNullChecks` : `true`일 때, `null`/`undefined`/`NaN` 을 할당할 경우 에러로 출력하도록 한다. 
>`strictNullChecks` : `false`일 때, `null`/`undefined`/`NaN` 을 할당해도 에러가 발생하지 않는다. 

아래 코드를 확인해 봅시다.

```ts
const x: number = null;
```

해당 코드는 `number` 에 `null`을 할당 했기 때문에, `strictNullChecks`가 `true`라면 에러를 발생할 것입니다.

null 을 허용하기 위해서는, 아래와 같이 의도를 명시적으로 드러냄으로써 오류를 고칠 수 있다.

```ts
const x: number | null = null;
// x의 타입은 number 이거나 null 이다.
```

---

```ts
const el = document.getElementById('status');

el.textContent = 'Ready';
// ~~ Object is possibly 'null'
```
`el`은 `status`를 못 찾을 경우, `null` 일 가능성이 있기 때문에 에러가 발생하게 될 것입니다.

```ts
const el = document.getElementById('status');

if (el) {
  el.textContent = 'Ready'; // OK, null has been excluded
}
el!.textContent = 'Ready'; // OK, we've asserted that el is non-null
```
위 코드는 el이 `null` 경우까지 대응을 하는 코드이기에 에러를 발생하지 않게 됩니다.

