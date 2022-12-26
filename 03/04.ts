/**
 * class 를 사용하면, 타입(런타임 접근 불가)과 값(런타임 접근 가능)을 둘 다 사용이 가능하다.
 * 아래와 같이 타입을 클래스로 만들면 된다.
 * 
 * 그래서 클래스로 선언하면 타입과 값으로 모두 사용할 수 있다.
 */

class Square {
  constructor(public width: number) {}
}
class Rectangle extends Square {
  constructor(public width: number, public height: number) {
    super(width);
  }
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    shape; // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape; // Type is Square
    return shape.width * shape.width; // OK
  }
}

export default {};
