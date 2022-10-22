export function getBottomPosition() {
  return window.scrollY + window.innerHeight;
}

export function isBottomPosIn(heightPx: number) {
  let totalHeight = document.body.clientHeight;
  return totalHeight <= getBottomPosition() + heightPx;
}
