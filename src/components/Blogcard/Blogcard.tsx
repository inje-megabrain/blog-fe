/** @jsxImportSource @emotion/react */
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import { CardContent } from '@mui/material';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { css } from '@emotion/react';
import data from '/Users/choijinseo/Desktop/메인페이지/blog-fe/src/components/data/data.json';

function Blogcard(props: any) {
  const navigate = useNavigate();

  const check = () => {
    if (props.cardnumber === 0) {
      navigate('/Blogmain');
    }
  };
  const gridstyle = css`
    margin-top: 5%;
    margin-left: 10%;
    margin-right: 10%;
    margin-bottom: 5%;
  `;

  return (
    <div css={gridstyle}>
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="baseline"
        spacing={5}
      >
        <Grid item xs={12}>
          <Card sx={{ borderRadius: '20px' }} onClick={check}>
            <CardContent>
              <Typography variant="h6" component="div">
                {data.carddata[props.cardnumber].title}
              </Typography>
              <Typography variant="body2">
                {data.carddata[props.cardnumber].making}
                <br />
                {data.carddata[props.cardnumber].location}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={'3%'} justifyContent="space-between">
            <Card sx={{ borderRadius: '20px', width: '30%', height: '30%' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {data.carddata[props.cardnumber + 1].title}
                </Typography>
                <Typography variant="body2">
                  {data.carddata[props.cardnumber + 1].making}
                  <br />
                  {data.carddata[props.cardnumber + 1].location}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ borderRadius: '20px', width: '30%', height: '30%' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {data.carddata[props.cardnumber + 2].title}
                </Typography>
                <Typography variant="body2">
                  {data.carddata[props.cardnumber + 2].making}
                  <br />
                  {data.carddata[props.cardnumber + 2].location}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ borderRadius: '20px', width: '30%', height: '30%' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {data.carddata[props.cardnumber + 3].title}
                </Typography>
                <Typography variant="body2">
                  {data.carddata[props.cardnumber + 3].making}
                  <br />
                  {data.carddata[props.cardnumber + 3].location}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ borderRadius: '20px', width: '30%', height: '30%' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {data.carddata[props.cardnumber + 4].title}
                </Typography>
                <Typography variant="body2">
                  {data.carddata[props.cardnumber + 4].making}
                  <br />
                  {data.carddata[props.cardnumber + 4].location}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" spacing={'3%'} justifyContent="space-between">
            <Card sx={{ borderRadius: '20px', width: '50%', height: '30%' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {data.carddata[props.cardnumber + 5].title}
                </Typography>
                <Typography variant="body2">
                  {data.carddata[props.cardnumber + 4].making}
                  <br />
                  {data.carddata[props.cardnumber + 4].location}
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ borderRadius: '20px', width: '50%', height: '30%' }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {data.carddata[props.cardnumber + 6].title}
                </Typography>
                <Typography variant="body2">
                  {data.carddata[props.cardnumber + 6].making}
                  <br />
                  {data.carddata[props.cardnumber + 6].location}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
}
export default Blogcard;
