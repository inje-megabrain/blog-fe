import { FC } from 'react';
import { PageItem } from './pageTypes';

import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

interface IListViewItem {
  item: PageItem;
}

const ListViewItem: FC<IListViewItem> = ({ item }) => {
  /**
   * 제목
   * 사진 오른쪽
   * 날짜는 위쪽에
   * 설명
   * 태그
   * 작성자
   */
  return (
    <Card elevation={0}>
      <Stack direction="row">
        <CardContent>
          <Typography fontWeight="650" component="div" variant="h6">
            {item.name}
          </Typography>
          <Typography component="div" variant="subtitle2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure rem
            laudantium inventore sunt accusamus earum exercitationem ut libero
            odio nostrum dolore ipsam iste excepturi quam quidem facilis maxime,
            accusantium provident. Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Repellat aspernatur minus eaque nam nostrum sed,
            perferendis nihil illo, consectetur ipsa ullam deserunt dolorum
            suscipit! Voluptates deleniti recusandae dolore atque consequuntur.
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{
            height: 150,
            width: 220,
            borderRadius: '7px',
            margin: '7px',
          }}
          image="https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg"
          alt="s"
        />
      </Stack>
    </Card>
  );
};

export default ListViewItem;
