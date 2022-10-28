import { useRef } from 'react';
import selectParent from '../utils/selectParent';
import Stack from '../utils/stack';

export interface Operator {
  getBlockId(element: HTMLElement): string;
  isBlock(element: HTMLElement): boolean;
  ignoreCase(element: HTMLElement): boolean;
  callbackCaptured(blockId: HTMLElement): void;
  callbackCaptureSolved(element: HTMLElement): void;
}

export interface Context {
  blocks: Stack<HTMLElement>;
  flag: {
    leftButtonPushed: boolean;
    rightButtonPushed: boolean;
    moved: boolean;
    toggle: boolean;
  };
}

function handleMouseDown(cx: Context, { ignoreCase }: Operator) {
  return (e: React.MouseEvent) => {
    if (e.shiftKey) return;

    if (selectParent(e.target as HTMLElement, ignoreCase)) return;

    cx.flag.moved = false;
    switch (e.button) {
      case 0:
        cx.flag.leftButtonPushed = true;
        break;
      case 2:
        cx.flag.rightButtonPushed = true;
        break;
    }
  };
}

function handleMouseUp(cx: Context, clear: () => void) {
  return (e: React.MouseEvent) => {
    if (e.shiftKey) return;

    // 움직임이 없는데, 왼쪽 버튼이 일어난 경우
    // 즉 움직임이 없다는 것은 드래그가 일어나지 않은 것을 의미함.
    if (!cx.flag.moved && cx.flag.leftButtonPushed) {
      clear();
    }

    // 초기화
    cx.flag.leftButtonPushed = false;
    cx.flag.rightButtonPushed = false;
  };
}

function handleMouseMove(
  cx: Context,
  { isBlock, callbackCaptureSolved, callbackCaptured }: Operator,
  clear: () => void,
) {
  return (e: React.MouseEvent) => {
    // 왼쪽 클릭 확인
    if (!cx.flag.leftButtonPushed) return;

    if (!cx.flag.moved) {
      cx.flag.moved = true;
      clear();
    }

    const el = selectParent(e.target as HTMLElement, isBlock);

    if (!el) return;

    if (cx.blocks.has(el)) {
      cx.blocks.popTo(el).forEach(callbackCaptureSolved);
    } else {
      cx.blocks.push(el);

      // 시작시, 하나만 있는 경우는 적용하지 않음.

      // 둘 이상이 선택된 경우에만 capture 적용
      if (!cx.flag.toggle && cx.blocks.size > 1) {
        cx.flag.toggle = true;
        callbackCaptured(cx.blocks.values[0]);
      }
      if (cx.flag.toggle) callbackCaptured(el);
    }
  };
}

function handleClick(
  cx: Context,
  { isBlock, callbackCaptureSolved, callbackCaptured }: Operator,
) {
  return (e: React.MouseEvent) => {
    // 쉬프트 키 확인

    if (!e.shiftKey) return;

    const el = selectParent(e.target as HTMLElement, isBlock);

    if (!el) return;

    if (cx.blocks.has(el)) {
      cx.blocks.delete(el).forEach(callbackCaptureSolved);
    } else {
      callbackCaptured(el);
      cx.blocks.push(el);
    }
  };
}

export default function useDragElement(operator: Operator) {
  const cx = useRef<Context>();

  if (!cx.current) {
    cx.current = {
      blocks: new Stack<HTMLElement>(),
      flag: {
        moved: false,
        rightButtonPushed: false,
        leftButtonPushed: false,
        toggle: false,
      },
    };
  }

  const clearCapture = () => {
    if (!cx.current) return;
    cx.current.blocks.forEach(operator.callbackCaptureSolved);
    cx.current.blocks.clear();
    cx.current.flag.toggle = false;
  };

  return {
    onMouseUp: handleMouseUp(cx.current, clearCapture),
    onMouseDown: handleMouseDown(cx.current, operator),
    onClick: handleClick(cx.current, operator),
    onMouseMove: handleMouseMove(cx.current, operator, clearCapture),
  };
}
