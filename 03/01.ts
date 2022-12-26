/**
 * # 런타임에는 타입 체크가 불가능 합니다.
 * 
 * instanceof 체크는 런타임에 일어나지만, 
 * Rectangle은 타입이기 때문에 런타임 시점에서는 아무것도 하지 않는다.
 * 
 * 실제로 자바스크립트 컴파일 과정에서는 모든 인터페이스, 타입, 타입 구문은 그냥 제거되어 버립니다.
 * 그래서 컴파일된 파일(01.js)를 확인해보면 제거되어 있다.
 * 
 * `type Shape = Square | Rectangle;`
 * Shape 타입은 '태그된 유니온(tagged union)의 한 예이다.'
 * 런타임에 타입 정보를 손쉽게 유지할 수 있기 때문에,
 * 타입스크립트에서 흔하게 볼수 있다.
 */

interface Square {
  width: number;
}
interface Rectangle extends Square {
  height: number;
}
type Shape = Square | Rectangle;

function calculateArea(shape: Shape) {
  if (shape instanceof Rectangle) {
    // ~~~~~~~~~ 'Rectangle' only refers to a type,
    //           but is being used as a value here
    return shape.width * shape.height;
    //         ~~~~~~ Property 'height' does not exist
    //                on type 'Shape'
  } else {
    return shape.width * shape.width;
  }
}

export default {};
