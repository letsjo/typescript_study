/**
 * 아래 코드는 shape의 변수는 위 interface가 사라져도 
 * 문제가 될 게 없기 때문에 에러를 발생하지 않게 된다.
 */

interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;
function calculateArea(shape: Shape) {
  if ('height' in shape) {
    shape; // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape; // Type is Square
    return shape.width * shape.width;
  }
}

export default {};
