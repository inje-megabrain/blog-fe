import { Dispatch, useReducer } from 'react';
import { Comment } from '../types/comment';

/**
 *  For 2 depth
 */
export interface UIComment extends Comment {
  isExpand: boolean;
  alreadyFetch: boolean;
  children: Comment[] | undefined;
}

export type Action = {
  type: keyof typeof ActionType;
  payload?: any;
  target?: number;
};

export type State = {
  isLoading: boolean;
  isError: boolean;
  comments: UIComment[];
};

export const ActionType = {
  ASSIGN: 'assign',
  LOADING: 'loading',
  ERROR: 'error',
  DONE: 'done',
  // 미완
  SORT: 'sort',
};

export const INITIAL_STATE: State = {
  isLoading: false,
  isError: false,
  comments: [],
};

export interface Operator {
  fetchTopLevelComment(articleId: number, page: number): Promise<Comment[]>;
  fetchChildrenComment(commentId: number): Promise<Comment[]>;
}

const commentMapping: (comment: Comment) => UIComment = (comment) => ({
  ...comment,
  isExpand: false,
  alreadyFetch: false,
  children: undefined,
});

const getUIComment: (
  comments: UIComment[],
  commentId: number,
) => [UIComment, number] = (comments, commentId) => {
  const idx = comments.findIndex((val) => val.id === commentId);
  return [comments[idx], idx];
};

const replaceCommentAt = (
  index: number,
  comment: UIComment,
  array: UIComment[],
) => {
  return [...array.slice(0, index), comment, ...array.slice(index + 1)];
};

const commentReducer: (state: State, action: Action) => State = (
  state,
  action,
) => {
  switch (action.type) {
    // 페이지에서 TopLevel Comment를 가져옴
    case ActionType.ASSIGN:
      return {
        ...state,
        isLoading: false,
        comments: action.payload,
      };
    case ActionType.LOADING:
      return { ...state, isLoading: true };
    case ActionType.DONE:
      return { ...state, isLoading: false };
    case ActionType.SORT:
      return { ...state };
    case ActionType.ERROR:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
  // 어떤 경우에도 매칭되지 않거나, break 되는 경우는 Error 임.
};

function handleFromDispatch(
  state: State,
  dispatch: Dispatch<Action>,
  articleId: number,
  operator: Operator,
) {
  return {
    state,
    async fetchComment(page: number) {
      // 로딩 상태
      dispatch({ type: 'LOADING' });
      const comming = await operator.fetchTopLevelComment(articleId, page);
      dispatch({ type: 'ASSIGN', payload: [...state.comments, ...comming] });
    },
    async expand(commentId: number) {
      const [selected, index] = getUIComment(state.comments, commentId);

      if (!selected.alreadyFetch) {
        // 로딩 상태 전환
        dispatch({ type: 'LOADING' });
        // 대댓글 가져오기
        const comments = await operator.fetchChildrenComment(commentId);
        // State에 할당.
        dispatch({
          type: 'ASSIGN',
          payload: replaceCommentAt(
            index,
            {
              ...selected,
              isExpand: true,
              alreadyFetch: true,
              children: comments,
            },
            state.comments,
          ),
        });
      } else {
        dispatch({
          type: 'ASSIGN',
          payload: replaceCommentAt(
            index,
            {
              ...selected,
              isExpand: true,
            },
            state.comments,
          ),
        });
      }
    },
    unexpand(commentId: number) {
      const [selected, index] = getUIComment(state.comments, commentId);
      dispatch({
        type: 'ASSIGN',
        payload: replaceCommentAt(
          index,
          {
            ...selected,
            isExpand: false,
          },
          state.comments,
        ),
      });
    },
  };
}

export default function useCommentReducer(
  articleId: number,
  operator: Operator,
) {
  const [state, dispatch] = useReducer(commentReducer, INITIAL_STATE);

  return handleFromDispatch(state, dispatch, articleId, operator);
}
