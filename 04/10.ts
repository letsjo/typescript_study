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
