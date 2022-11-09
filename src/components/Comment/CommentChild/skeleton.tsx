import { Skeleton, Stack, Box, ListItem } from '@mui/material';

const CommentChildSkeleton = () => {
  return (
    <Stack direction="row" spacing={2}>
      <Skeleton height={40} width={40} variant="rounded" />

      <Box width="200px" sx={{ paddingTop: '2px' }}>
        <Skeleton animation="wave" />

        <Skeleton animation="wave" />
      </Box>
    </Stack>
  );
};

export default CommentChildSkeleton;
