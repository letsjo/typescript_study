/*
  04.js를 타입스크립트에서는 의도대로 실행될 수 있도록 capital로 변경할 수 있도록 오류 발생
*/

const states5 = [
  { name: 'Alabama', capital: 'Montgomery' },
  { name: 'Alaska', capital: 'Juneau' },
  { name: 'Arizona', capital: 'Phoenix' },
  // ...
];

for (const state of states5) {
  console.log(state.capitol);
  // ~~~~~~~ Property 'capitol' does not exist on type
  //         '{ name: string; capital: string; }'.
  //         Did you mean 'capital'?
}
