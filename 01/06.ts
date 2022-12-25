/*
  capitol 이라고 했지만, capital이 capitol로 수정하기를 권장한다.

  의도는 capital 이고, 오타는 capitol이지만, 
  capitol 로 수정을 권장하기 때문에 어느 쪽이 오타인지는 판단하지 못한다.

  그렇기 때문에 states를 선언하여 의도를 분명하게 하는 것이 좋습니다. [07.ts 참고: interface 권장사용]
*/

const states6 = [
  { name: 'Alabama', capitol: 'Montgomery' },
  { name: 'Alaska', capitol: 'Juneau' },
  { name: 'Arizona', capitol: 'Phoenix' },
  // ...
];

for (const state of states6) {
  console.log(state.capital);
  // ~~~~~~~ Property 'capital' does not exist on type
  //         '{ name: string; capitol: string; }'.
  //         Did you mean 'capitol'?
}
