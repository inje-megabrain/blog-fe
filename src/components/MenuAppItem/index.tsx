import { IconButton, SvgIconTypeMap } from '@mui/material';
import { css } from '@emotion/react';
import { FC } from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';

type Props = {
  handleClick?: () => void;
  name: string;
  to: string;
  SvgIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
};

const buttonStyled = css`
  border-radius: 5px;
  &:hover {
    background-color: #d9e8fa;
  }
`;

const iconStyled = css`
  font-size: 33px;
`;

const centerStyled = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const spanStyled = css`
  font-size: 14px;
`;

const Notice: FC<Props> = ({ handleClick, name, SvgIcon, to }) => {
  return (
    <>
      {handleClick ? (
        <IconButton css={buttonStyled} onClick={handleClick}>
          <div css={centerStyled}>
            <SvgIcon css={iconStyled} />
            <span css={spanStyled}>{name}</span>
          </div>
        </IconButton>
      ) : (
        <a href={to} style={{ textDecoration: 'none' }}>
          <IconButton css={buttonStyled}>
            <div css={centerStyled}>
              <SvgIcon css={iconStyled} />
              <span css={spanStyled}>{name}</span>
            </div>
          </IconButton>
        </a>
      )}
    </>
  );
};

export default Notice;
