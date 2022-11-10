import {
  Avatar,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Box,
  SxProps,
  Theme,
} from '@mui/material';
import React, { useState } from 'react';
import { UIComment } from '../../../types/comment';
import CommentReply from '../CommentReply';
import CommentReplySkeleton from '../CommentReply/skeleton';
import CommentWrite from '../CommentWrite';

const toolButtonStyle: SxProps<Theme> = {
  fontSize: '14px',
  padding: '0px',
  margin: '0px',
};

type Props = {
  data: UIComment;
  expand: (id: number) => void;
  unexpand: (id: number) => void;
};

const CommentItem = ({ data, expand, unexpand }: Props) => {
  const [reply, setReply] = useState(false);

  const handleExpand = () => expand(data.id);
  const handleUnExpand = () => unexpand(data.id);
  const handleReply = () => setReply((p) => !p);
  const indent = 7;

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="Sharp" src={data.pictureUrl} />
        </ListItemAvatar>
        <Stack direction="column">
          <ListItemText
            primary={data.writer}
            secondary={
              <>
                {/* <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                Ali Connors
              </Typography> */}
                {data.content}
              </>
            }
          />
          <Box>
            {data.hasChild ? (
              data.isExpand ? (
                <Button sx={toolButtonStyle} onClick={handleUnExpand}>
                  감추기
                </Button>
              ) : (
                <Button sx={toolButtonStyle} onClick={handleExpand}>
                  보기
                </Button>
              )
            ) : undefined}
            <Button sx={toolButtonStyle} onClick={handleReply}>
              답글쓰기
            </Button>
          </Box>
        </Stack>
      </ListItem>
      {reply && (
        <ListItem sx={{ pl: indent }}>
          <CommentWrite parentId={data.id} />
        </ListItem>
      )}
      <Collapse in={data.isExpand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.alreadyFetch ? (
            data.children?.map((child) => (
              <ListItem sx={{ pl: indent }}>
                <CommentReply key={child.id} data={child} />
              </ListItem>
            ))
          ) : (
            <ListItem sx={{ pl: indent }}>
              <CommentReplySkeleton />
            </ListItem>
          )}
        </List>
      </Collapse>
    </>
  );
};

export default React.memo(CommentItem);
