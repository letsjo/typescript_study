interface Identified {
  id: string;
}
interface Person {
  name: string;
}
interface Lifespan {
  birth: Date;
  death?: Date;
}
type PersonSpan = Person & Lifespan;

const a: PersonSpan = {
  name: 'a',
  birth: new Date(),
  death: new Date(),
};

export default {};
