import React, { useEffect, useRef } from 'react';
import selectParent from '../utils/selectParent';
import Stack from '../utils/stack';

export interface Operator {
  getBlockId(element: HTMLElement): string;
  isBlock(element: HTMLElement): boolean;
  ignoreCase(element: HTMLElement): boolean;
  callbackCaptured(blockId: HTMLElement): void;
  callbackCaptureSolved(element: HTMLElement): void;
  callbackContextMenu(e: MouseEvent): void;
}

export class Context {
  public history: Stack<HTMLElement>;
  private flag: {
    proper: boolean;
    leftButtonPushed: boolean;
    rightButtonPushed: boolean;
    move: boolean;
    toggle: boolean;
    mode: boolean;
  };

  constructor() {
    this.history = new Stack();
    this.flag = {
      proper: false,
      leftButtonPushed: false,
      rightButtonPushed: false,
      toggle: false,
      move: false,
      mode: false,
    };
  }

  setProper(value: boolean) {
    this.flag.proper = value;
  }

  setButton(button: number, clickedElement: HTMLElement | null) {
    if (button === 0) this.flag.leftButtonPushed = true;

    if (
      button === 2 &&
      clickedElement &&
      this.history.values.indexOf(clickedElement) !== -1
    ) {
      this.flag.rightButtonPushed = true;
    }
  }

  setMoved(value: boolean) {
    this.flag.move = value;
  }

  setMode(e: React.MouseEvent) {
    this.flag.mode = e.shiftKey;
  }

  setToggle(value: boolean) {
    this.flag.toggle = value;
  }

  get proper() {
    return this.flag.proper;
  }

  get moved() {
    return this.flag.move;
  }

  get moded() {
    return this.flag.mode;
  }
  get toggled() {
    return this.flag.toggle;
  }

  get left() {
    return this.flag.leftButtonPushed;
  }

  get right() {
    return this.flag.rightButtonPushed;
  }

  get dragged() {
    return this.flag.leftButtonPushed && this.flag.move;
  }

  resetFlagWithoutToggle() {
    this.flag.leftButtonPushed = false;
    this.flag.proper = false;
    this.flag.rightButtonPushed = false;
    this.flag.move = false;
    this.flag.mode = false;
  }
}

function handleMouseDown(cx: Context, { ignoreCase, isBlock }: Operator) {
  return (e: React.MouseEvent) => {
    cx.setMode(e);

    // 기능키 인 경우 무시
    if (cx.moded) return;
    // 적절한 요소를 선택했는지, Hover 제외 시킴
    cx.setProper(selectParent(e.target as HTMLElement, ignoreCase) == null);
    // 클릭된 버튼 설정 (Left or Right)
    cx.setButton(e.button, selectParent(e.target as HTMLElement, isBlock));
  };
}

function handleMouseUp(
  cx: Context,
  { callbackContextMenu }: Operator,
  clear: () => void,
) {
  return (e: MouseEvent) => {
    // 기능키 인 경우 무시
    if (cx.moded) return;

    // 드래그가 일어나지 않은 경우
    // 또는 오른쪽 클릭이 아닌 경우
    if (!cx.dragged && !cx.right) clear();
    // 오른쪽 클릭인 경우 Context Menu 띄우기(단, 선택된게 있는 경우)
    if (cx.right && cx.toggled) callbackContextMenu(e);

    // 플래그 초기화
    cx.resetFlagWithoutToggle();
  };
}

function handleMouseMove(
  cx: Context,
  { isBlock, callbackCaptureSolved, callbackCaptured }: Operator,
  clear: () => void,
) {
  return (e: React.MouseEvent) => {
    // 적절한 요소 또는 왼쪽 클릭 아니면 종료
    if (!cx.proper || !cx.left) return;

    // 처음 움직이는 경우, 기존 요소 제거
    if (!cx.moved) {
      cx.setToggle(false);
      cx.setMoved(true);
      clear();
    }

    const el = selectParent(e.target as HTMLElement, isBlock);

    if (!el) return;

    const idx = cx.history.indexOf(el);

    if (idx !== -1) {
      // 마지막 요소가 아닌 경우.
      if (idx !== cx.history.size - 1)
        cx.history.popTo(el).forEach(callbackCaptureSolved);
    } else {
      cx.history.push(el);

      // 시작시, 하나만 있는 경우는 적용하지 않음.
      // 둘 이상이 선택된 경우에만 capture 적용
      if (!cx.toggled && cx.history.size > 1) {
        cx.setToggle(true);
        callbackCaptured(cx.history.values[0]);
      }
      if (cx.toggled) callbackCaptured(el);
    }
  };
}

function handleClick(
  cx: Context,
  { isBlock, callbackCaptureSolved, callbackCaptured }: Operator,
) {
  return (e: React.MouseEvent) => {
    // 기능키의 경우에만 사용
    if (!cx.moded) return;

    const el = selectParent(e.target as HTMLElement, isBlock);

    if (!el) return;

    if (cx.history.indexOf(el) !== -1) {
      cx.history.delete(el).forEach(callbackCaptureSolved);
    } else {
      cx.history.push(el);
      callbackCaptured(el);
    }
  };
}

export default function useDragElement(operator: Operator) {
  const cx = useRef<Context>();

  if (!cx.current) cx.current = new Context();

  useEffect(() => {
    if (!cx.current) return;

    const listener = handleMouseUp(cx.current, operator, clear);

    window.addEventListener('mouseup', listener);

    return () => window.removeEventListener('mouseup', listener);
  }, [clear]); // 의존성 있으나 없으나 같지만 가독성을 위해 써줌.

  function clear() {
    if (!cx.current) return;

    cx.current.history.clear(operator.callbackCaptureSolved);
    cx.current.setToggle(false);
  }

  return {
    onMouseDown: handleMouseDown(cx.current, operator),
    onClick: handleClick(cx.current, operator),
    onMouseMove: handleMouseMove(cx.current, operator, clear),
  };
}
