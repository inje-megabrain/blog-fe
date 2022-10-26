import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import EditablePage from '../../components/EditablePage';
import LeftMenuBar from '../../components/EditorLeftMenu';
import uid from '../../utils/uid';
const initialBlock = { id: uid(), html: '', tag: 'h1' };

const TextEditor = () => {
  const [blocks, setBlocks] = useState([initialBlock]);

  const pressPublishButton = () => {
    console.log(blocks);
  };
  return (
    <Container maxWidth="lg" sx={{ position: 'relative' }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Grid
            container
            spacing={0}
            direction="column"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
          >
            <Grid item xs={3}>
              <LeftMenuBar />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                노우션 프로젝트
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                리액트 연구소 ON
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={pressPublishButton}>
                publish
              </Button>
            </CardActions>
          </Card>
          <EditablePage blocks={blocks} setBlocks={setBlocks} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TextEditor;
