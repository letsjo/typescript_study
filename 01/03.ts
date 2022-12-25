/*
  02.js를 타입스크립트에서는 toUpperCase로 변경할 수 있도록 오류 발생
*/

let city = 'new york city';
console.log(city.toUppercase());
// ~~~~~~~~~~~ Property 'toUppercase' does not exist on type
//             'string'. Did you mean 'toUpperCase'?
