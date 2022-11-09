export interface Comment {
  id: number;
  pictureUrl: string;
  writer: string;
  content: string;
  postAt: string | Date;
  hasChild: boolean;
  parentId: number; // -1 = no parent
}

export interface UIComment extends Comment {
  isExpand: boolean;
  alreadyFetch: boolean;
  children: Comment[] | undefined;
}
