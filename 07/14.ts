function getKey<K extends string>(val: any, key: K) {
  // ...
}

getKey({}, 'x');
getKey({}, Math.random() < 0.5 ? 'a' : 'b');
getKey({}, document.title);
getKey({}, 12); // `12`  형식의 인수는 `String` 형식의 매개변수에 할당할 수 없습니다.

export default {};
