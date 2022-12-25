/*
  capital 로 사용하려고 했습니까? 로 에러가 뜬다.
*/

interface State {
  name: string;
  capital: string;
}

const states: State[] = [
  { name: 'Alabama', capital: 'Montgomery' },
  { name: 'Alaska', capitol: 'Juneau' },
  // ~~~~~~~~~~~~~~~~~ Did you mean to write 'capital'?
  { name: 'Arizona', capital: 'Phoenix' },
  // ...
];
