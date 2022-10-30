import { Divider, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { css } from '@emotion/react';

type Props = {
  children: any;
  handleBack: () => void;
};

const backStyled = css({
  position: 'sticky',
  top: 0,
  backgroundColor: 'white',
  cursor: 'pointer',
  padding: '3px 0px 1px 0px',
});

const MenuDetailContent = ({ children, handleBack }: Props) => {
  return (
    <>
      <div css={backStyled} onClick={handleBack}>
        <IconButton>
          <ArrowBackIcon />
        </IconButton>
        <span
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            verticalAlign: 'middle',
          }}
        >
          Apps
        </span>
        <Divider />
      </div>
      {children}
    </>
  );
};

export default MenuDetailContent;
