/**
 * interface 에 kind를 추가해서
 * 이 값이 rectangle 인지 square 인지 명확하게 해주면 해결할 수 있다.
 */

interface Square {
  kind: 'square';
  width: number;
}
interface Rectangle {
  kind: 'rectangle';
  height: number;
  width: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape.kind === 'rectangle') {
    shape; // Type is Rectangle
    return shape.width * shape.height;
  } else {
    shape; // Type is Square
    return shape.width * shape.width;
  }
}

/*
위와 같은 코드일 경우 아래와 같이 
반드시 kind도 함께 포함시켜서 모양이 무엇인지 알려줘야한다.

calculateArea({
  width: 100,
  kind: 'square',
});

calculateArea({
  height: 100,
  width: 100,
  kind: 'rectangle',
});
*/

export default {};
