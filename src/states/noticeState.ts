import { atom } from 'recoil';
import bindObject from '../utils/bindObject';

export interface NoticeState {
  readonly count: number;
  app: {
    [key: string]: number;
  };
}

export const noticeState = atom<NoticeState>({
  key: 'noticeState',
  default: bindObject({
    get count() {
      return Object.values<number>(this.app).reduce((acc, cur) => acc + cur, 0);
    },
    app: {
      noticeApp: 1,
      mainApp: 1,
    },
  }),
});
