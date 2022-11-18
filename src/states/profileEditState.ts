import { atom } from 'recoil';
import { IProfile } from '../types/profile';

export const inputState = atom<IProfile | undefined>({
  key: 'profileState',
  default: undefined,
});
