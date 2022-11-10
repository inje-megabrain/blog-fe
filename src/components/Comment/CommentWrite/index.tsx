import { Send } from '@mui/icons-material';
import { Box, Button, Divider, SxProps, TextField, Theme } from '@mui/material';
import { useState } from 'react';

type Props = {
  articleId?: number;
  parentId?: number;
};

const buttonStyle: SxProps<Theme> = {
  fontSize: '14px',
  padding: '4px 6px',
  marginTop: '5px',
};

const CommentWrite = ({ articleId, parentId }: Props) => {
  const [message, setMessage] = useState('');

  const style = articleId
    ? {
        background: 'white',
        position: 'sticky',
        bottom: '0px',
        zIndex: 99,
        padding: '5px 0px',
        borderTop: '1px solid #eee',
      }
    : {};

  return (
    <Box sx={style} width={500}>
      <TextField
        id="standard-multiline-flexible"
        // label="standard"
        multiline
        fullWidth
        maxRows={4}
        value={message}
        variant="standard"
        placeholder={!parentId ? '댓글 입력' : '답글 입력'}
        onChange={({ target: { value } }) => setMessage(value)}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button sx={buttonStyle} variant="contained" endIcon={<Send />}>
          {!parentId ? (articleId ? '댓글 쓰기' : undefined) : '답글 쓰기'}
        </Button>
      </Box>
    </Box>
  );
};

export default CommentWrite;
