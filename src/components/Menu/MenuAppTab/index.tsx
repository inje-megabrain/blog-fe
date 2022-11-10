import { Grid } from '@mui/material';
import { css } from '@emotion/react';
import menuAppItems from '../../../utils/menuAppItems';
import MenuAppItem from '../MenuAppItem';

type Props = {
  col: number;
  handleDetail: (component: JSX.Element) => () => void;
};

const centerStyled = css`
  display: flex;
  justify-content: center;
`;

// flex-direction: column;
// align-items: center;

const MenuAppContent = ({ col, handleDetail }: Props) => {
  // Grid condition
  if (12 % col !== 0) throw Error(`col: ${col}는 12의 약수가 아닙니다.`);

  const colTemplate = Math.floor(12 / col);

  return (
    <Grid container spacing={2} css={{ paddingTop: '10px' }}>
      {menuAppItems.map((AppData, idx) => (
        <Grid css={centerStyled} item xs={colTemplate} key={idx}>
          {AppData.Component ? (
            <MenuAppItem
              data={AppData}
              handleClick={handleDetail(<AppData.Component />)}
            />
          ) : (
            <MenuAppItem data={AppData} />
          )}
        </Grid>
      ))}
    </Grid>
  );
};

export default MenuAppContent;
