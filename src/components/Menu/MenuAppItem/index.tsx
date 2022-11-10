import { Badge, IconButton, SvgIconTypeMap } from '@mui/material';
import { css } from '@emotion/react';
import { FC } from 'react';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { useRecoilValue } from 'recoil';
import { noticeState } from '../../../states/noticeState';

type Props = {
  data: {
    id: string;
    name: string;
    to: string;
    SvgIcon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  };
  handleClick?: () => void;
};

type WrapperProps = {
  handleClick?: () => void;
  to: string;
  children: any;
};

const buttonStyled = css`
  border-radius: 5px;
  padding: 8px 16px;
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
  padding-top: 3px;
  font-size: 14px;
  white-space: nowrap;
`;

const MenuAppItemWrapper = ({ handleClick, children, to }: WrapperProps) => {
  return (
    <>
      {handleClick ? (
        <IconButton css={buttonStyled} onClick={handleClick}>
          {children}
        </IconButton>
      ) : (
        <a href={to} style={{ textDecoration: 'none' }}>
          <IconButton css={buttonStyled} onClick={handleClick}>
            {children}
          </IconButton>
        </a>
      )}
    </>
  );
};

const MenuAppItem: FC<Props> = ({ data, handleClick }) => {
  const { app } = useRecoilValue(noticeState);

  return (
    <MenuAppItemWrapper to={data.to} handleClick={handleClick}>
      <Badge css={centerStyled} badgeContent={app[data.id]} color="primary">
        <data.SvgIcon css={iconStyled} />
        <span css={spanStyled}>{data.name}</span>
      </Badge>
    </MenuAppItemWrapper>
  );
  // <Badge badgeContent={app[data.id]} color="primary">
  //   {handleClick ? (
  //     <IconButton css={buttonStyled} onClick={handleClick}>
  //       <div css={centerStyled}>
  //         <data.SvgIcon css={iconStyled} />
  //         <span css={spanStyled}>{data.name}</span>
  //       </div>
  //     </IconButton>
  //   ) : (
  //     <a href={data.to} style={{ textDecoration: 'none' }}>
  //       <IconButton css={buttonStyled}>
  //         <div css={centerStyled}>
  //           <data.SvgIcon css={iconStyled} />
  //           <span css={spanStyled}>{data.name}</span>
  //         </div>
  //       </IconButton>
  //     </a>
  //   )}
  // </Badge>
};

export default MenuAppItem;
