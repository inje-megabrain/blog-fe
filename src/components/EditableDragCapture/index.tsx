import { FC } from 'react';
import useDragElement, { Operator } from '../../hooks/useDragElement';
import bindObject from '../../utils/bindObject';

export interface IEditableDragCapture {
  children: any;
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
}

function setCaptureState(
  setter: React.Dispatch<React.SetStateAction<Block[]>>,
  id: string,
  value: boolean,
) {
  setter((prev) => {
    const index = prev.findIndex((block) => block.id === id);
    if (index === -1) return prev;
    const selected = prev[index];

    return [
      ...prev.slice(0, index),
      { ...selected, captured: value },
      ...prev.slice(index + 1),
    ];
  });
}

const operator = (
  blocks: Block[],
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>,
) =>
  bindObject<Operator>({
    ignoreCase(element) {
      return element.dataset.rbdDragHandleDraggableId != undefined;
    },
    getBlockId: function (element: HTMLElement) {
      return element.dataset.rbdDraggableId as string;
    },
    isBlock: function (element: HTMLElement) {
      return element.dataset.rbdDraggableId != undefined;
    },
    callbackCaptured: function (element: HTMLElement): void {
      setCaptureState(setBlocks, this.getBlockId(element), true);
    },
    callbackCaptureSolved: function (element: HTMLElement): void {
      setCaptureState(setBlocks, this.getBlockId(element), false);
    },
    callbackContextMenu(e) {
      // console.log('오른쪽 클릭 됨', e, blocks);
    },
  });

const EditableDragCapture: FC<IEditableDragCapture> = ({
  children,
  blocks,
  setBlocks,
}) => {
  const listeners = useDragElement(operator(blocks, setBlocks));

  return <div {...listeners}>{children}</div>;
};

export default EditableDragCapture;
