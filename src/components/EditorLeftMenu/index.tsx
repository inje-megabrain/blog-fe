import { MenuItem, MenuList } from '@mui/material';
import allowedTags from '../../utils/tagList';

const EditorLeftMenuBar = () => {
  return (
    <MenuList sx={{ mb: 20 }}>
      {allowedTags.map((i, key) => {
        return (
          <MenuItem
            key={key}
            role="button"
            onClick={() => {
              //onSelect(i.tag);
            }}
          >
            {i.label}
          </MenuItem>
        );
      })}
    </MenuList>
  );
};

export default EditorLeftMenuBar;
