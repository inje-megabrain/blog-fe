import React from 'react';
import Profile from '../Profile/Profile';
import styled from 'styled-components';
import ProfileImageUpload from './ProfileImageUpload';
import ProfileIntroduceEdit from './ProfileIntroduceEdit';

const ProfileEditLayout = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;

  .editBox {
    padding: 20px;
    margin: 100px 50px 20px 50px;
    border: 2px solid #000;
    width: 100%;
  }

  .profileImage,
  .profileInfo,
  .profileFollower,
  .profileLink,
  .profileBadge {
    padding: 10px;
    border: 2px solid #000;
    margin-bottom: 10px;
  }
`;

function ProfileEdit() {
  return (
    <ProfileEditLayout>
      <Profile />
      <div className="editBox">
        <div className="profileImage">
          프로필 이미지 변경
          <ProfileImageUpload />
        </div>
        <div className="profileInfo">
          소개글 수정 <ProfileIntroduceEdit />
        </div>
        <div className="profileBadge">뱃지 선택</div>
        <div className="profileLink">외부 링크 등록</div>
      </div>
    </ProfileEditLayout>
  );
}

export default ProfileEdit;
