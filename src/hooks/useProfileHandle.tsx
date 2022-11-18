import { useState } from 'react';
import { IProfile } from '../types/profile';

const useProfileHandle = (
  initialValue: IProfile = {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYT5vWrJRxhNRIOnkpLlz_x4gUJTtnplXCxA&usqp=CAU',
    info: '',
  },
) => {
  const [profile, setProfile] = useState<IProfile>(initialValue);

  return {
    profile,
    handle: {
      setProfileInfo(info: string) {
        setProfile((prev) => ({ ...prev, info }));
      },
      setProfileImg(img: string) {
        setProfile((prev) => ({ ...prev, img }));
      },
      //setProfileBadge
    },
  };
};

export default useProfileHandle;
