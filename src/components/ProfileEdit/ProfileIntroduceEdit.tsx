import React, { useState } from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';

import { IProfile } from '../../types/profile';
import useProfileHandle from '../../hooks/useProfileHandle';

const Styles = styled.div`
  .inputContents {
    margin: 5px;
    border: 3px solid #f1cf24;
    border-radius: 15px;
    width: 300px;
    height: 200px;
    font-size: 15px;
  }

  input:focus {
    outline: none;
    border-color: #f1cf24;
  }
`;

type Props = {
  setInfo: (info: string) => void;
  info: string;
};

const ProfileIntroduceEdit = ({ setInfo, info }: Props) => {
  const [onModify, setOnModify] = useState(false);
  //const { profile, handle } = useProfileHandle();

  // 일단 버튼은 toggle 넣어뒀는데, 나중에는 수정 완료 버튼 용도로 바꿀 예정
  const toggleModify = () => {
    setOnModify((prev: boolean) => (prev === true ? false : true));
  };

  const onChangeContents = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInfo(e.target.value);
  };

  const complete = () => {
    //API 전송
    console.log('내용 : ' + info);
  };

  return (
    <Styles>
      <input
        className="inputContents"
        type="text"
        disabled={onModify ? false : true}
        placeholder="Introduce Yourself!"
        value={info}
        onChange={onChangeContents}
      ></input>
      <Button onClick={toggleModify}>수정하기</Button>
      <Button onClick={complete}>수정완료</Button>
    </Styles>
  );
};

export default ProfileIntroduceEdit;
