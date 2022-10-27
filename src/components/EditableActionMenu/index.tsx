import { MenuItem, MenuList } from '@mui/material';

type Props = {
  position: { x: number | null | undefined; y: number | null | undefined };
  actions: { deleteBlock: () => void };
};

const EditableActionMenu = ({ position, actions }: Props) => {
  const x = position.x! + 100;
  const y = position.y! - 60;
  const pressDeleteButton = () => {
    actions.deleteBlock();
  };
  return (
    <MenuList
      sx={{
        position: 'absolute',
        display: 'block',
        width: 'auto',
        bgcolor: 'white',
        boxShadow:
          '0 0 0 1px rgb(15 15 15 / 5%), 0 3px 6px rgb(15 15 15 / 10%), 0 9px 24px rgb(15 15 15 / 20%)',
        borderRadius: '0.5rem',
        top: y,
        left: x,
      }}
    >
      <MenuItem
        id="delete"
        role="button"
        tabIndex={0}
        onClick={pressDeleteButton}
      >
        삭제
      </MenuItem>
    </MenuList>
  );
};

export default EditableActionMenu;
