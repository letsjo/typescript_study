자바스크립트는 본질적으로 `덕 타이핑(duck typing)` 기반입니다.

![](https://velog.velcdn.com/images/gusdh2/post/6bc526df-a4b5-40bf-ba9d-1436d9e54d78/image.png)


>덕 타이핑(duck typing)이란?
>
객체가 어떤 타입에 부합하는 변수와 메서드를 가질 경우 객체를 해당 타입에 속하는 것으로 간주하는 방식입니다.
>
`덕 테스트(The Duck Test)`에서 유래된 말로, 만약 어떤 새가 오리처럼 걷고, 헤엄치고, 꽥꽥거리는 소리를 낸다면, 나는 그 새를 오리라고 부를 것이다.

어떤 함수의 매개변수 값이 모두 제대로 주어진다면, 그 값이 어떻게 만들어 졌는지 신경 쓰지 않고 사용합니다. 

아래 코드를 확인해 보겠습니다.

```ts
interface Vector2D {
  x: number;
  y: number;
}

function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

interface NamedVector {
  name: string;
  x: number;
  y: number;
}

const v: NamedVector = { x: 3, y: 4, name: 'Zee' };
calculateLength(v); // OK, result is 5

export default {};
```

`Vector2D` 라는 타입이 있고, `NamedVector` 라는 타입이 있습니다.

`calculateLength`의 매개변수 타입을 `Vector2D`로 지정해놓았지만, `NamedVector` 타입도 `x`와 `y`이 존재하여 호환되기 때문에, 호출이 가능하게 됩니다.

여기서 `구조적 타이핑(structural typing)` 이라는 용어가 사용됩니다.

하지만 `구조적 타이핑` 때문에 문제가 발생하기도 합니다.

```ts
interface Vector2D {
  x: number;
  y: number;
}

function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

interface NamedVector {
  name: string;
  x: number;
  y: number;
}

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

function normalize(v: Vector3D) {
  const length = calculateLength(v);  
  // calculateLength 의도는 x^2 + y^2 + z^2 값을 반환 
  // (실제 출력: x^2 + y^2 - z값은 무시 됨)
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  };
}

export default {};
```

위 코드와 같이 의도와 다르게 버그가 발생하기도 합니다.

그럼 `calculateLengthL`함수를 아래 코드로 변경하면 어떻게 될까요?

```ts
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

function calculateLength(v: Vector3D) {
  let length = 0;
  for (const axis of Object.keys(v)) {
    const coord = v[axis];
    // ~~~~~~~ Element implicitly has an 'any' type because ...
    //         'string' can't be used to index type 'Vector3D'
    length += Math.abs(coord);
  }
  return length;
}
```

오류가 없을 것이라고 생각했던 것과 다르게 `const coord = v[axis];`에서 에러가 발생할 것입니다.

`coord` 값의 타입을 예상 할 수 없어 `any` 타입으로 지정되었기 때문입니다.

`Object.keys(v)`는 `["x","y","z"]` 일 것이고, `v`의 키 값에 넣어주면 `number` 타입을 출력할 것인데, 왜 에러가 나는 것이지? 라고 생각할 수 있을 것 같습니다. 

함수를 작성할 때, 호출에 사용되는 매개변수의 속성들이 매개변수의 타입에 선언된 속성만 가질 거라 생각하기 쉽습니다.

왜 에러가 나는지는 아래 코드를 확인하면, 이해할 수 있을 것 같습니다.

```ts
interface Vector3D {
  x: number;
  y: number;
  z: number;
}

function calculateLength(v: Vector3D) {
  let length = 0;
  for (const axis of Object.keys(v)) {
    const coord = v[axis];
    // ~~~~~~~ Element implicitly has an 'any' type because ...
    //         'string' can't be used to index type 'Vector3D'
    length += Math.abs(coord);
  }
  return length;
}

const vec3D = { x: 3, y: 4, z: 1, address: '123 Broadway' };
calculateLength(vec3D); // OK, returns NaN
```
즉, `vec3D`의 값은 `x`와 `y`와 `z`값을 가지고 있기 때문에 `Vector3D` 타입에 만족합니다. 하지만 `address` 값 포함되어있기 때문에 `coord` 값은 `number` 타입이라고 확정할 수 없습니다.

그렇기 때문에 아래 코드 처럼 루프보다는 모든 속성을 각각 더하는 구현이 더 낫습니다.

```ts
interface Vector3D {
  x: number;
  y: number;
  z: number;
}
function calculateLength(v: Vector3D) {
  return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z);
}

export default {};
```

구조적 타이핑은 클래스(class)에서 더 당황스러운 결과를 보여줍니다.

```ts
class C {
  foo: string;
  constructor(foo: string) {
    this.foo = foo;
  }
}

const c: C = new C('instance of C');
console.log(c instanceof C); // true

const d: C = { foo: 'object literal' }; // OK!
console.log(d instanceof C); // false

export default {};
```

`d`의 경우에는 자바스크립트의 구조상 `C` 클래스 타입과 별개로 object 로 선언됩니다. 

하지만 `C` 클래스 타입의 `foo`가 존재하기 때문에 구조적으로 필요한 속성과 생성자가 존재하기 때문에 정상적으로 호출됩니다. 만약 `C`의 생성자에 단순 할당이 아닌 연산 로직이 존재한다면, `d`의 경우는 생성자를 실행하지 않으므로 문제가 발생하게 됩니다.

아래 코드를 통해서 조금 더 자세하게 파악할 수 있습니다.

```ts
class C {
  foo: string
  constructor(foo: string) {
    this.foo = foo
  }
  method() {}
}

const c: C = new C('instance of C')
const d: C = { foo: 'object literal' } 
// error. 'method' 속성이 '{ foo: string; }' 형식에 없지만 'C' 형식에서 필수입니다.
const e: C = { foo: '', method() {} } 
// foo, method 속성이 모두 있으면 okay.

class E {
  method() {}
}

class D extends E {
  foo: string
  constructor(foo: string) {
    super()
    this.foo = foo
  }
}

const f: C = new D('') 
// prototype chain 상에 method가 존재하면 okay.

const g = Object.create({ method() {} }, { foo: { value: '' } }) 
// g: any
const h: C = g 
// C type 강제(assert)하여 okay.

const i: { foo: string; method: () => void } = Object.create({ method() {} }, { foo: { value: '' } })
const j: C = i 
// { foo, method } 타입을 강제하여 okay.
```

---