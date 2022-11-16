import React, { useState, useRef } from 'react';
import { Button } from '@mui/material';

const ProfileImageUpload = (props: any) => {
  const [imageUrl, setImageUrl] = useState('');
  const imgRef = useRef<any>();

  const onChangeImage = () => {
    const reader = new FileReader();
    const file = imgRef.current.files[0];
    console.log(file);

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
        console.log('이미지 주소 : ', reader.result);
      }
    };
  };

  const onClickFileBtn = (e: any) => {
    imgRef.current.click();
  };

  return (
    <div>
      <div
        style={{ width: '150px', height: '150px', backgroundColor: 'yellow' }}
      >
        <img
          style={{ width: '150px' }}
          src={imageUrl ? imageUrl : 'No Image'}
        />
      </div>
      <input
        type="file"
        ref={imgRef}
        onChange={onChangeImage}
        style={{ display: 'none' }}
      ></input>
      <Button onClick={onClickFileBtn}>프로필 변경</Button>
    </div>
  );
};

export default ProfileImageUpload;
