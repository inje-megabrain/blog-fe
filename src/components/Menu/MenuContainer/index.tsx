import { Paper } from '@mui/material';
import { css } from '@emotion/react';
import { useState } from 'react';
import MenuAppTab from '../MenuAppTab';
import MenuDetailTab from '../MenuDetailTab';

type Props = {
  col?: number;
};

const paperStyled = css`
  padding: 0px 15px 5px 15px;
  border-radius: 8px;
  border: 1px solid #eee;
  height: 200px;
  width: 200px;

  overflow-y: auto;

  &::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    background-color: #d5d5d5;
    border: 4px solid transparent;
    border-radius: 10px;
  }
  &::-webkit-scrollbar {
    width: 15px;
  }
`;

const MenuContent = ({ col = 3 }: Props) => {
  const [content, setContent] = useState<null | JSX.Element>(null);

  const handleHome = () => setContent(null);

  const handleDetail = (component: JSX.Element) => () => setContent(component);

  return (
    <Paper css={paperStyled} elevation={2}>
      {!content ? (
        <MenuAppTab col={col} handleDetail={handleDetail} />
      ) : (
        <MenuDetailTab handleBack={handleHome}>{content}</MenuDetailTab>
      )}
    </Paper>
  );
};

export default MenuContent;
