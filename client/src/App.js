import React from 'react';
import { Card, CardContent, Typography } from '@mui/material'
import { makeStyles } from '@material-ui/core/styles';
import Input from './components/input'
import List from './components/list'
const useStyles = makeStyles( theme => (
  {
    card :{
      maxwidth: 600,
     
      margin: 'auto',
      marginTop: theme.spacing(5),
      display: 'flex',
      justifyContent: 'center'
  }

}))


const App = () => {
  const classes =useStyles()
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography>
            To do List App
        </Typography>
        {/* Enter todo item */}
          <Input/>

          <List/>
      </CardContent>
    </Card>
  );
}

export default App;
