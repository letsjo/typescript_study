function getElement(elOrId: string | HTMLElement | null): HTMLElement {
  // const a = typeof null
  // null이 object 이기도 하기 때문에 return 값이 에러가 뜬다.
  if (typeof elOrId === 'object') {
    return elOrId
    // ~~~~~~~~~~~~~~ 'HTMLElement | null' is not assignable to 'HTMLElement'
  } else if (elOrId === null) {
    return document.body
  } else {
    const el = document.getElementById(elOrId)
    return el
    // ~~~~~~~~~~ 'HTMLElement | null' is not assignable to 'HTMLElement'
  }
}

export default {}
