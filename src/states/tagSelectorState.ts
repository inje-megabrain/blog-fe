import { atom } from 'recoil';

export const selectTagState = atom<string[]>({
  key: 'selectTagState',
  default: [],
});
