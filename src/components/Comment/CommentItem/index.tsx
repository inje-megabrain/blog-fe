import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Avatar,
  Button,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { UIComment } from '../../../types/comment';
import CommentChild from '../CommentChild';

type Props = {
  data: UIComment;
  expand: (id: number) => void;
  unexpand: (id: number) => void;
};

const CommentItem = ({ data, expand, unexpand }: Props) => {
  const handleExpand = () => expand(data.id);
  const handleUnExpand = () => unexpand(data.id);

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
              <Button onClick={handleUnExpand}>감추기...</Button>
            ) : (
              //<ExpandMore />
              // <ExpandLess />
              <Button onClick={handleExpand}>더보기...</Button>
            )
          ) : undefined}
        </Stack>
      </ListItem>
      <Collapse in={data.isExpand} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.children?.map((child) => (
            <CommentChild key={child.id} data={child} />
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default React.memo(CommentItem);
