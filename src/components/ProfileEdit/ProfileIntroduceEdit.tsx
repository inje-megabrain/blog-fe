import React, { useState, useCallback } from 'react';
import { Button } from '@mui/material';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { inputState } from '../../states/profileEditState';

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

const ProfileIntroduceEdit = (props: any) => {
  const [onModify, setOnModify] = useState(false);
  const [contents, setContents] = useRecoilState(inputState);

  // 일단 버튼은 toggle 넣어뒀는데, 나중에는 수정 완료 버튼 용도로 바꿀 예정
  const toggleModify = () => {
    setOnModify((prev: boolean) => (prev === true ? false : true));
  };

  const onChangeContents = () => {};

  const complete = () => {
    //setContents(contents);
    console.log('내용 : ' + contents);
  };

  return (
    <Styles>
      <input
        className="inputContents"
        type="text"
        disabled={onModify ? false : true}
        placeholder="Introduce Yourself!"
        value={contents}
      ></input>
      <Button onClick={toggleModify}>수정하기</Button>
      <Button onClick={complete}>수정완료</Button>
    </Styles>
  );
};

export default ProfileIntroduceEdit;
