const setCaretToEnd = (element: HTMLElement | null) => {
  const range = document.createRange();
  const selection = window.getSelection();
  if (element != null) {
    range.selectNodeContents(element);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
    element.focus();
  }
};

export default setCaretToEnd;
