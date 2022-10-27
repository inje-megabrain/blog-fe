import { MenuItem, MenuList } from '@mui/material';
import { matchSorter } from 'match-sorter';
import { useCallback, useEffect, useState } from 'react';
import allowedTags from '../../utils/tagList';

const MENU_HEIGHT = 150;
type Props = {
  position: { x: number | null | undefined; y: number | null | undefined };
  onSelect: (tag: string) => void;
  close: () => void;
};

const EditableSlashSelectMenu = ({ position, onSelect, close }: Props) => {
  const [command, setCommand] = useState('');
  const [item, setItem] = useState(allowedTags);
  const [selectedItem, setSelectedItem] = useState(0);

  const keyDownHandler = useCallback(
    (e: { key: string; preventDefault: () => void }) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          onSelect(item[selectedItem].tag);
          break;
        case 'Backspace':
          if (!command) close();
          setCommand(command.substring(0, command.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          const prevSelected =
            selectedItem === 0 ? item.length - 1 : selectedItem - 1;
          setSelectedItem(prevSelected);
          break;
        case 'ArrowDown':
        case 'Tab':
          e.preventDefault();
          const nextSelected =
            selectedItem === item.length - 1 ? 0 : selectedItem + 1;
          setSelectedItem(nextSelected);
          break;
        default:
          setCommand(command + e.key);
          break;
      }
    },
    [close, command, item, onSelect, selectedItem],
  );

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [keyDownHandler]);

  useEffect(() => {
    if (command) {
      const sortItem = matchSorter(allowedTags, command, { keys: ['tag'] });
      setItem(sortItem);
    }
  }, [command]);

  const x = position.x!;
  const y = position.y! - MENU_HEIGHT;
  const positionAttributes = { top: y!, left: x! };
  return (
    <MenuList
      className="SelectMenu"
      style={positionAttributes}
      sx={{
        display: 'block',
        position: 'fixed',
        backgroundColor: 'white',
        border: 1,
        borderRadius: 4,
        scrollbarWidth: 1,
      }}
    >
      {item.map((i, key) => {
        const isSelected = item.indexOf(i) === selectedItem;
        return (
          <MenuItem
            selected={isSelected}
            className={'Selected'}
            key={key}
            role="button"
            onClick={() => {
              onSelect(i.tag);
            }}
          >
            {i.label}
          </MenuItem>
        );
      })}
    </MenuList>
  );
};

export default EditableSlashSelectMenu;
