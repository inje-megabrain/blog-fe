import { ListItem, ListItemText, Typography } from '@mui/material';
import { Comment } from '../../../types/comment';

type Props = {
  data: Comment;
};

const CommentChild = ({ data }: Props) => {
  return (
    <ListItem>
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
    </ListItem>
  );
};

export default CommentChild;
