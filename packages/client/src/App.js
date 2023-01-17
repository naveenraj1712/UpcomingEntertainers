// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import {StylesProvider} from '@material-ui/core';
// import {MuiPickersUtilsProvider} from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns'
import LoginPage from './components/LoginPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <StylesProvider injectFirst>
        <Header/>
        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
          <LoginPage/>
        {/* </MuiPickersUtilsProvider> */}
      </StylesProvider>
    </Router>
  );
}

export default App;
