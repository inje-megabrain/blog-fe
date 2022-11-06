import { css } from '@emotion/react';
import Menu from '../../components/Menu';

const styled = css`
  margin: 300px;
  display: flex;
  justify-content: center;
`;

export default () => {
  return (
    <div css={styled}>
      <Menu id="header-menu" direction="right" />
    </div>
  );
};
