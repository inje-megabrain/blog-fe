import { debounce, List } from '@mui/material';
import CommentItem from './CommentItem';
import useCommentReducer, { Operator } from '../../hooks/useCommentReducer';
import CommentRepo from '../../utils/commentRepo';
import { useEffect } from 'react';
import { useWindowEvent } from '../../hooks/useWindowEvent';
import { isBottomPosIn } from '../../utils/scroll';

type Props = {
  articleId: any;
};

//#region Fetch Logic
const operator: Operator = {
  async fetchTopLevelComment(articleId, page) {
    return CommentRepo.page(articleId, page, 15);
  },
  async fetchChildrenComment(commentId) {
    return CommentRepo.search(commentId);
  },
};

//#endregion

const Comment = ({ articleId }: Props) => {
  const { state, fetchComment, expand, unexpand } = useCommentReducer(
    articleId,
    operator,
  );

  useEffect(() => {
    fetchComment(1);
  }, []);

  // useWindowEvent(
  //   ['scroll'],
  //   debounce((_) => {
  //     if (isBottomPosIn(50) && isNext()) {
  //       fetchNext();
  //     }
  //   }, 100),
  // );

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {state.comments.map((comment) => (
        <CommentItem
          key={comment.id}
          data={comment}
          expand={expand}
          unexpand={unexpand}
        />
      ))}
    </List>
  );
};

export default Comment;
