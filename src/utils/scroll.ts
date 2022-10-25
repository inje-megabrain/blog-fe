export function getBottomPosition() {
  return window.scrollY + window.innerHeight;
}

/**
 * 사용자 화면의 하단 위치가 인식 영역에 들어갔는가?
 * @param heightPx 민감도, 하단 인식 영역
 * @returns
 */
export function isBottomPosIn(heightPx: number) {
  let totalHeight = document.body.clientHeight;
  return totalHeight <= getBottomPosition() + heightPx;
}
