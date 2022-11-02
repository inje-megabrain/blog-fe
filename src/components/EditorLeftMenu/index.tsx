import { MenuItem, MenuList } from '@mui/material';
import { useRecoilState } from 'recoil';
import { tagState } from '../../states/editorState';
import allowedTags from '../../utils/tagList';

const EditorLeftMenuBar = () => {
  const [leftBarTag, setLeftBarTag] = useRecoilState(tagState);

  return (
    <MenuList sx={{ mb: 20 }}>
      {allowedTags.map((i, key) => {
        return (
          <MenuItem
            key={key}
            role="button"
            onClick={() => {
              if (leftBarTag == i.tag) return;
              setLeftBarTag(i.tag);
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
