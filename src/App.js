import React from 'react'
import {Switch, Route, Link} from 'react-router-dom'
import Loader from './Loader'
import 'bootstrap/dist/css/bootstrap.min.css'
import { makeStyles } from '@material-ui/core/styles';


import './App.css'
import Solvers from './Components/Solvers'
import Default from './Components/Default'
import { Paper, Tabs, Tab } from '@material-ui/core';
import { MuiThemeProvider ,createMuiTheme } from '@material-ui/core/styles';
import Results from './Components/Results';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#3f51b5',
      dark:'#1a237e',
      main: '#303f9f',
      contrastText: '#f1f1f1'
    },
    secondary: {
      main: '#bf360c',
    },
    
  },
})

const useStyles = makeStyles({
  root: {
    
    backgroundColor: '#303f9f',
    fontWeight: '600',
    color: '#f1f1f1',
    
  },
  indicator: {
    backgroundColor: '#f1f1f1'
  }
})

function App() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
      setValue(newValue);
  };

  return (
    <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor='secondary'
            classes='root'
            centered
          >
            <Tab label="Решатели" className={classes.root}>
              <Link to='/'></Link>
            </Tab>
            <Tab label="Циклы" className={classes.root}>
              <Link to='/'></Link>
            </Tab>
            <Tab label="Еще что-то" className={classes.root} >
              <Link to='/'></Link>
            </Tab>
          </Tabs>
        </Paper>

        <Switch>
          <Route exact path='/'> <React.Suspense fallback={<Loader/>}> <Solvers /> </React.Suspense> </Route>
          <Route path='/results'> <React.Suspense fallback={<Loader/>}> <Results /> </React.Suspense> </Route>
          <Route> <React.Suspense fallback={<Loader/>}> <Default /> </React.Suspense> </Route>
        </Switch>
      </MuiThemeProvider>
    </React.Fragment>

  )
}

export default App;
