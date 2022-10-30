import { css } from '@emotion/react';
import Menu from '../../components/Menu';

const styled = css`
  display: flex;
  justify-content: flex-end;
`;

export default () => {
  return (
    <div css={styled}>
      <Menu id="header-menu" />
    </div>
  );
};
