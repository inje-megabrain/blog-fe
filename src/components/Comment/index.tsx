import { useRef } from 'react';
import useCommentReducer, { Operator } from '../../hooks/useCommentReducer';

type Props = {
  articleId: any;
};

//#region Fetch Logic
const operator: Operator = {
  async fetchTopLevelComment(articleId, page) {
    return [];
  },
  async fetchChildrenComment(commentId) {
    return [];
  },
};

//#endregion

const Comment = ({ articleId }: Props) => {
  const ctRef = useRef(null);

  const { state, fetchComment, expand, unexpand } = useCommentReducer(
    articleId,
    operator,
  );

  return <div ref={ctRef}></div>;
};

export default Comment;
