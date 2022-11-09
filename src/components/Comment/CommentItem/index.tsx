import {
  Avatar,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  SxProps,
  Theme,
} from '@mui/material';
import React from 'react';
import { UIComment } from '../../../types/comment';
import CommentChild from '../CommentChild';
import CommentChildSkeleton from '../CommentChild/skeleton';

const expandButtonStyle: SxProps<Theme> = {
  fontSize: '14px',
  padding: '2px',
};

type Props = {
  data: UIComment;
  expand: (id: number) => void;
  unexpand: (id: number) => void;
};

const CommentItem = ({ data, expand, unexpand }: Props) => {
  const handleExpand = () => expand(data.id);
  const handleUnExpand = () => unexpand(data.id);
  const indent = 7;

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={data.pictureUrl} />
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
          {data.hasChild ? (
            data.isExpand ? (
              <Button sx={expandButtonStyle} onClick={handleUnExpand}>
                감추기...
              </Button>
            ) : (
              <Button sx={expandButtonStyle} onClick={handleExpand}>
                더보기...
              </Button>
            )
          ) : undefined}
        </Stack>
      </ListItem>
      <Collapse in={data.isExpand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.alreadyFetch ? (
            data.children?.map((child) => (
              <ListItem sx={{ pl: indent }}>
                <CommentChild key={child.id} data={child} />
              </ListItem>
            ))
          ) : (
            <ListItem sx={{ pl: indent }}>
              <CommentChildSkeleton />
            </ListItem>
          )}
        </List>
      </Collapse>
    </>
  );
};

export default React.memo(CommentItem);
