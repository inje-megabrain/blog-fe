import selectParent from '../utils/selectParent';
import Stack from '../utils/stack';

export interface Operator {
  getBlockId(element: HTMLElement): string;
  isBlock(element: HTMLElement): boolean;
  callbackCaptured(element: HTMLElement): void;
  callbackCaptureSolved(element: HTMLElement): void;
}

export interface Flag {
  leftButtonPushed: boolean;
  rightButtonPushed: boolean;
  moved: boolean;
  toggle: boolean;
}

function handleMouseDown(flag: Flag) {
  return (e: React.MouseEvent) => {
    if (e.shiftKey) return;

    flag.moved = false;
    switch (e.button) {
      case 0:
        flag.leftButtonPushed = true;
        break;
      case 2:
        flag.rightButtonPushed = true;
        break;
    }
  };
}

function handleMouseUp(flag: Flag, clear: () => void) {
  return (e: React.MouseEvent) => {
    if (e.shiftKey) return;

    if (!flag.rightButtonPushed && !flag.moved) clear();

    if (flag.leftButtonPushed && !flag.moved) clear();

    flag.leftButtonPushed = false;
    flag.rightButtonPushed = false;
  };
}

function handleMouseMove(
  { isBlock, callbackCaptureSolved, callbackCaptured }: Operator,
  captureds: Stack<HTMLElement>,
  flag: Flag,
  clear: () => void,
) {
  return (e: React.MouseEvent) => {
    // 왼쪽 클릭 확인
    if (!flag.leftButtonPushed) return;

    if (!flag.moved) {
      flag.moved = true;
      clear();
    }

    const el = selectParent(e.target as HTMLElement, isBlock);

    if (!el) return;

    if (captureds.has(el)) {
      captureds.popTo(el).forEach(callbackCaptureSolved);
    } else {
      captureds.push(el);

      // 시작시, 하나만 있는 경우는 적용하지 않음.

      // 둘 이상이 선택된 경우에만 capture 적용
      if (!flag.toggle && captureds.size > 1) {
        flag.toggle = true;
        callbackCaptured(captureds.values[0]);
      }
      if (flag.toggle) callbackCaptured(el);
    }
  };
}

function handleClick(
  { isBlock, callbackCaptureSolved, callbackCaptured }: Operator,
  captureds: Stack<HTMLElement>,
  flag: Flag,
) {
  return (e: React.MouseEvent) => {
    // 쉬프트 키 확인

    if (!e.shiftKey) return;

    const el = selectParent(e.target as HTMLElement, isBlock);

    if (!el) return;

    if (captureds.has(el)) {
      captureds.delete(el).forEach(callbackCaptureSolved);
    } else {
      callbackCaptured(el);
      captureds.push(el);
    }
  };
}

export default function useCaptureContext(operator: Operator) {
  const captureds = new Stack<HTMLElement>();

  const flag: Flag = {
    moved: false,
    rightButtonPushed: false,
    leftButtonPushed: false,
    toggle: false,
  };

  const clearCapture = () => {
    captureds.forEach(operator.callbackCaptureSolved);
    captureds.clear();
    flag.toggle = false;
  };

  // // 아무데나 클릭 시, 포커스 제거
  // useEffect(() => {
  //   const onMouseUp = handleMouseUp(flag);

  //   window.addEventListener('mouseup', onMouseUp);

  //   return () => window.removeEventListener('mouseup', onMouseUp);
  // }, [flag]);

  return {
    capturedBlocks: captureds.map(operator.getBlockId),
    clearCapture,
    listeners: {
      onMouseUp: handleMouseUp(flag, clearCapture),
      onMouseDown: handleMouseDown(flag),
      onClick: handleClick(operator, captureds, flag),
      onMouseMove: handleMouseMove(operator, captureds, flag, clearCapture),
    },
  };
}
