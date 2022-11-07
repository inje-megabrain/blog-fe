import { FC } from 'react';
import { Page, PageItem } from '../../types/page';

import {
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  Typography,
  IconButton,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

interface ICardViewItem {
  item: PageItem;
}

const CardViewItem: FC<ICardViewItem> = ({ item }) => {
  /**
   * 제목
   * 사진 오른쪽
   * 날짜는 위쪽에
   * 설명
   * 태그
   * 작성자
   */
  return (
    <Card elevation={2} sx={{ minWidth: 200 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVert />
          </IconButton>
        }
        title={item.name}
        subheader={item.full_name}
      />

      {/** TODO change thumbnail size about View-port size */}
      <CardMedia
        component="img"
        image="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
        sx={{
          height: 150,
          width: 1,
          borderRadius: '7px',
          margin: '7px',
        }}
        alt="s"
      />

      <CardContent>
        <Typography paragraph variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia a
          debitis corrupti, itaque sint quisquam molestiae adipisci officia
          ipsam, tenetur nam dolorum enim necessitatibus natus, nemo similique
          libero. Vero, nulla?
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CardViewItem;
