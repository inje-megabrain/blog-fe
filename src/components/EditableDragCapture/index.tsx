import { FC } from 'react';
import useCaptureContext, { Operator } from '../../hooks/useCaptureContext';

export interface IEditableDragCapture {
  children: any;
}

const operator: Operator = {
  getBlockId: function (element: HTMLElement): string {
    return element.dataset.rbdDraggableId as string;
  },
  isBlock: function (element: HTMLElement): boolean {
    return element.dataset.rbdDraggableId != undefined;
  },
  callbackCaptured: function (element: HTMLElement): void {
    element.style.backgroundColor = 'red';
  },
  callbackCaptureSolved: function (element: HTMLElement): void {
    element.style.backgroundColor = 'white';
  },
};

const EditableDragCapture: FC<IEditableDragCapture> = ({ children }) => {
  const { listeners } = useCaptureContext(operator);

  return <div {...listeners}>{children}</div>;
};

export default EditableDragCapture;
