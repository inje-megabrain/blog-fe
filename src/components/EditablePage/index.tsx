import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import uid from '../../utils/uid';
import EditableBlock from '../EditableBlock';
import usePrevState from '../../hooks/usePrevState';
import setCaretToEnd from '../../utils/setCaretToEnd';
import EditableDragCapture from '../EditableDragCapture';

type Props = {
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
};

const EditablePage = ({ blocks, setBlocks }: Props) => {
  const [currentBlockId, setCurrentBlockId] = useState<string>('');
  const prevBlocks = usePrevState(blocks);
  useEffect(() => {
    if (prevBlocks && prevBlocks.length + 1 === blocks.length) {
      const nextBlockPosition =
        blocks.map((b) => b.id).indexOf(currentBlockId) + 2;
      const nextBlock = document.querySelector(
        `[data-position="${nextBlockPosition}"]`,
      ) as HTMLElement | null;
      if (nextBlock != null) {
        nextBlock?.focus();
      }
    }
    if (prevBlocks && prevBlocks.length - 1 === blocks.length) {
      const lastBlockPosition = prevBlocks
        .map((b: Block) => b.id)
        .indexOf(currentBlockId);
      const lastBlock = document.querySelector(
        `[data-position="${lastBlockPosition}"]`,
      ) as HTMLElement | null;
      if (lastBlock) {
        setCaretToEnd(lastBlock);
      }
    }
  }, [blocks, currentBlockId]);

  const changeCursor = (currentBlock: Block, isDown: boolean) => {
    const blockPosition = blocks
      .map((b: Block) => b.id)
      .indexOf(currentBlock.id);
    const changeBlock = document.querySelector(
      `[data-position="${isDown ? blockPosition + 2 : blockPosition}"]`,
    ) as HTMLElement | null;
    if (changeBlock) {
      changeBlock.focus();
    }
  };

  const updatePageHandler = (currentBlock: Block) => {
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks: Block[] = [...blocks];
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
      imageUrl: currentBlock.imageUrl,
    };
    setBlocks(updatedBlocks);
  };

  const addBlockHandler = (currentBlock: Block, prevTag: string) => {
    setCurrentBlockId(currentBlock.id);
    const index = blocks.map((b) => b.id).indexOf(currentBlock.id);
    const updatedBlocks: Block[] = [...blocks];
    const newBlock = {
      id: uid(),
      html: '',
      tag: prevTag === 'li' ? 'li' : 'p', //To-Do 추후 함수로 로직 추가
      captured: false,
    };
    updatedBlocks[index] = {
      ...updatedBlocks[index],
      tag: currentBlock.tag,
      html: currentBlock.html,
    };
    updatedBlocks.splice(index + 1, 0, newBlock);
    setBlocks(updatedBlocks);
  };

  const deleteBlockHandler = (blockId: string) => {
    if (blockId == blocks[0].id) {
      return;
    }
    if (blocks.length > 1) {
      setCurrentBlockId(blockId);
      const index = blocks.map((b) => b.id).indexOf(blockId);
      const updatedBlocks: Block[] = [...blocks];
      updatedBlocks.splice(index, 1);
      setBlocks(updatedBlocks);
    }
  };

  const onDragEndHandler = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination || destination.index === source.index) {
      return;
    }
    const updatedBlocks = [...blocks];
    const removedBlocks = updatedBlocks.splice(source.index - 1, 1);
    updatedBlocks.splice(destination.index - 1, 0, removedBlocks[0]);
    setBlocks(updatedBlocks);
  };

  return (
    <EditableDragCapture blocks={blocks} setBlocks={setBlocks}>
      <DragDropContext onDragEnd={onDragEndHandler}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {blocks &&
                blocks.map((block, index) => {
                  const position =
                    blocks.map((b) => b.id).indexOf(block.id) + 1;
                  return (
                    <EditableBlock
                      captured={block.captured}
                      key={block.id}
                      position={position}
                      id={block.id}
                      tag={block.tag}
                      html={block.html}
                      index={index}
                      changeCursor={changeCursor}
                      updatePage={updatePageHandler}
                      addBlock={addBlockHandler}
                      deleteBlock={deleteBlockHandler}
                    />
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </EditableDragCapture>
  );
};

export default EditablePage;
