/**
 * `fetch`의 타입은 타입스크립트에 포함되어 있는 DOM 타입 선언인 `lib.dom.d.ts`에 이미 선언되어있다.
 * declare function fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
 * type RequestInfo = Request | string;
 * declare var Request: {
    prototype: Request;
    new(input: RequestInfo | URL, init?: RequestInit): Request;
  };
 * RequestInit 은 04.ts 참조 
 */
 

const response = fetch('http://example.com')

export default {}
