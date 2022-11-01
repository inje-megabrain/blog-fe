export default function selectParent(
  startElement: HTMLElement,
  selector: (el: HTMLElement) => boolean,
  iteration: number = 4,
) {
  let el: HTMLElement | null = startElement;

  while (el && iteration-- != 0) {
    if (selector(el)) return el;

    el = el.parentElement;
  }

  return null;
}
