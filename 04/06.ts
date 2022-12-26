interface Vector2D {
  x: number;
  y: number;
}
function calculateLength(v: Vector2D) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}
interface NamedVector {
  name: string;
  x: number;
  y: number;
}
interface Vector3D {
  x: number;
  y: number;
  z: number;
}
function normalize(v: Vector3D) {
  const length = calculateLength(v);  
  // calculateLength 의도는 x^2 + y^2 + z^2 값을 반환 (실제 출력: x^2 + y^2 - z값은 무시 됨)
  return {
    x: v.x / length,
    y: v.y / length,
    z: v.z / length,
  };
}

export default {};
