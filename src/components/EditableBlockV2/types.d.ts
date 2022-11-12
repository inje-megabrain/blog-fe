export type Props = {
  position: number;
  id: string;
  tag: string;
  html: string;
  index: number;
  onFocusBlock: (block: Block) => void;
  captured: boolean;
  changeCursor: (block: Block, isDown: boolean) => void;
  updatePage: (block: Block) => void;
  addBlock: (block: Block, prevTag: string) => void;
  deleteBlock: (block: Block) => void;
};

export type States = {
  htmlBackup: string | null;
  html: string;
  tag: string;
  imageUrl: string;
  isHovering: boolean;
  selectMenuIsOpen: boolean;
  selectMenuPosition: {
    x: number | null | undefined;
    y: number | null | undefined;
  };
  actionMenuOpen: boolean;
  actionMenuPosition: {
    x: number | null | undefined;
    y: number | null | undefined;
  };
};

export interface BlockKeyDownEvent {
  key: string;
  shiftKey: KeyboardEvent['shiftKey'];
  nativeEvent: { isComposing: KeyboardEvent['nativeEvent']['isComposing'] };
  preventDefault: () => void;
}

export interface BlockKeyDownHandler {
  [key: string]: (e: BlockKeyDownEvent) => void;
}

export interface BlockChangeEvent {
  target: { value: string };
}
