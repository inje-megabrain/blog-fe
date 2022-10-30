import { Divider, Stack } from '@mui/material';

const NoticeContent = () => {
  return (
    <Stack direction="column" divider={<Divider variant="inset" />} spacing={3}>
      <div>알림1</div>
      <div>알림2</div>
      <div>알림3</div>
      <div>알림4</div>
      <div>알림5</div>
      <div>알림6</div>
      <div>알림7</div>
      <div>알림8</div>
      <div>알림9</div>
      <div>알림10</div>
    </Stack>
  );
};

export default NoticeContent;
