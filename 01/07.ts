/* 
  interface 사용하여 State의 의도를 명확하게 해서 잠재적 문제점을 찾을 수 있도록 할 수 있다.
*/

interface State {
  name: string;
  capital: string;
}
const states7: State[] = [
  { name: 'Alabama', capitol: 'Montgomery' },
  // ~~~~~~~~~~~~~~~~~~~~~
  { name: 'Alaska', capitol: 'Juneau' },
  // ~~~~~~~~~~~~~~~~~
  { name: 'Arizona', capitol: 'Phoenix' },
  // ~~~~~~~~~~~~~~~~~~ Object literal may only specify known
  //         properties, but 'capitol' does not exist in type
  //         'State'.  Did you mean to write 'capital'?
  // ...
];
for (const state of states7) {
  console.log(state.capital);
}
