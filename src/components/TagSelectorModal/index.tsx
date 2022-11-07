import {
  Modal,
  Typography,
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Chip,
} from '@mui/material';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectTagState } from '../../states/tagSelectorState';
import { tagCategory } from './backdata';

type Props = {
  open: boolean;
  handleOpen: () => void;
};

const TagSelectorModal = ({ open, handleOpen }: Props) => {
  const [category, setCategory] = useState('');
  const [categoryData, setCategoryData] = useState<string[]>([]);
  const [selectTagData, setSelectTagData] =
    useRecoilState<string[]>(selectTagState);

  const pressTagButton = (item: string) => {
    if (selectTagData.indexOf(item) >= 0) {
      setSelectTagData(selectTagData.filter((e) => e !== item));
    } else {
      setSelectTagData(selectTagData.concat(item));
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        style={{
          width: '40em',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'white',
          borderRadius: 10,
          padding: 30,
        }}
      >
        <Grid container columnGap={3} rowGap={3}>
          <Grid xs={10} item>
            <Typography variant="h4" component="h3">
              태그를 선택하세요
            </Typography>
          </Grid>
          <Grid xs={4} item>
            <List sx={{ overflow: 'auto', height: 300 }}>
              {tagCategory.map((item, index) => {
                return (
                  <ListItem disablePadding key={index}>
                    <ListItemButton
                      selected={item.title === category}
                      onClick={() => {
                        setCategory(item.title);
                        setCategoryData(item.data);
                      }}
                    >
                      <ListItemText primary={item.title} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>

          <Grid xs={7} item sx={{ width: '12em' }}>
            {categoryData.length > 0 ? (
              categoryData.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    label={item}
                    size="medium"
                    color="primary"
                    variant={
                      selectTagData.indexOf(item) >= 0 ? 'filled' : 'outlined'
                    }
                    sx={{ marginLeft: '0.4em', marginBottom: '0.4em' }}
                    onClick={() => pressTagButton(item)}
                  />
                );
              })
            ) : (
              <Typography
                variant="h6"
                component="h3"
                color="grey"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                카테고리를 선택하세요
              </Typography>
            )}
          </Grid>
          <Grid xs={12} item>
            {selectTagData.length > 0 &&
              selectTagData.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    label={item}
                    size="medium"
                    color="primary"
                    variant="filled"
                    sx={{ marginLeft: '0.4em', marginBottom: '0.4em' }}
                    onDelete={() => pressTagButton(item)}
                  />
                );
              })}
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default TagSelectorModal;
