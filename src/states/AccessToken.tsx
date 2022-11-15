import { atom } from 'recoil';

const AccessToken = atom<string>({
  key: 'access_token',
  default: 'reacoiltest',
});

export { AccessToken };
