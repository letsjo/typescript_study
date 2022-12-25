/*
  배열 2번째 index가 없어 에러가 나는 구문인데, 타입 체커에서 에러를 발생시키지 않는다.

  타입스크립트는 앞의 배열이 범위 내에서 사용될 것이라 가정했지만,
  실제로는 그렇지 않았고, 런타임 오류가 발생했습니다.
*/

const names = ['Alice', 'Bob'];
console.log(names[2].toUpperCase());
