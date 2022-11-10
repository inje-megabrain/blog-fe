import Comment from '../../components/Comment';

const CommentPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Comment articleId={1} />
    </div>
  );
};

export default CommentPage;
