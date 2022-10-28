import { FC } from 'react';
import useDragElement, { Operator } from '../../hooks/useDragElement';
import bindObject from '../../utils/bindObject';

export interface IEditableDragCapture {
  children: any;
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
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
      const index = blocks.findIndex(
        ({ id }) => id === this.getBlockId(element),
      );
      const capturedBlock = blocks[index];

      setBlocks((prev) => {
        const newBlocks = [...prev];
        newBlocks.splice(index, 1, {
          ...capturedBlock,
          captured: true,
        });
        return newBlocks;
      });
    },
    callbackCaptureSolved: function (element: HTMLElement): void {
      const index = blocks.findIndex(
        ({ id }) => id === this.getBlockId(element),
      );
      const solvedBlock = blocks[index];

      setBlocks((prev) => {
        const newBlocks = [...prev];
        newBlocks.splice(index, 1, {
          ...solvedBlock,
          captured: false,
        });
        return newBlocks;
      });
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
