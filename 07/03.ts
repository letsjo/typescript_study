/**
 * 두 개 혹은 세 개로 묶으려면 유니온(`union`) 타입을 사용합니다.
 * 유니온(`union`) 타입은 값 집합들의 합 집합들을 일컫습니다.
 */

type AB = 'A' | 'B';
type AB12 = 'A' | 'B' | 12;
type AB22 = AB | 12;

let a: AB22 = 12 as AB12;

export default {};
