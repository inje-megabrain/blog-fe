import { ListItemText, Typography } from '@mui/material';
import { Comment } from '../../../types/comment';

type Props = {
  data: Comment;
};

const CommentReply = ({ data }: Props) => {
  return (
    <>
      <ListItemText
        // primary="Brunch this weekend?"
        secondary={
          <>
            <Typography
              sx={{ display: 'inline' }}
              component="span"
              variant="body2"
              color="text.primary"
            >
              {data.writer} -
            </Typography>
            {data.content}
          </>
        }
      />
    </>
  );
};

export default CommentReply;
