import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

// pages
import {ThemeProvider, makeStyles} from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import TmpChat from './pages/TmpChat';
import ChatRoom from './pages/ChatRoom';
import Main from './pages/main';
import Entrance from './pages/entrance';
import Filters from './pages/filters';
import Location from './pages/area';
import NewProduct from './pages/newProduct';
// TODO
// import MyArticle from './pages/my-article-list';
// import Mypage from './pages/mypage';
import SetMyArea from './pages/setMyArea';
import ProductDetail from './pages/ProductDetail';

// TODO
// import ListView from './components/list-view';
// import { getBuyListById, getInterestProductById } from './service/product';

import { FilterProvider } from './contexts/filters';
import { SnackbarProvider } from './contexts/snackbar';
import UserStore from './contexts/user';
import AlertMessageStore from './contexts/alertMessage';
import ImageStore from './contexts/ImageStore';

import Navigator from './pages/navigator';
import NoticeBar from './pages/notice';

import muiTheme from './theme/muiTheme';
import theme from './theme';

import './style.css';
import AlertDialog from './components/alertDialog';

const useStyles = makeStyles({
  root: {
    margin: '0',
  },
});

export default () => {
  const classes = useStyles({});

  return (
    <AlertMessageStore>
      <UserStore>
        <SnackbarProvider>
          <FilterProvider>
            <ImageStore>
              <Router>
                <Switch>
                  <Route exact path='/' component={Entrance} />
                  <Route exact path='/enrollLocation' component={SetMyArea} />
                  <Route exact path='/write' component={NewProduct} />
                  <Route path='/product/:id' component={ProductDetail} />

                  <Grid container className={classes.root}>
                    <Route path='/service'>
                      <ThemeProvider theme={theme}>
                        <Route exact path='/service/main' component={Main} />
                        <Route
                          exact
                          path='/service/category'
                          component={Filters}
                        />
                        <Route
                          exact
                          path='/service/location'
                          component={Location}
                        />
                      </ThemeProvider>
                      <ThemeProvider theme={muiTheme}>
                        <Route exact path='/service/chat' component={TmpChat} />
                        <Route
                          exact
                          path='/service/chat/room/:id'
                          Component={ChatRoom}
                        />
                      </ThemeProvider>
                      <ThemeProvider theme={theme}>
                        <Navigator />
                        <NoticeBar />
                      </ThemeProvider>
                    </Route>
                  </Grid>
                </Switch>
                <AlertDialog />
              </Router>
            </ImageStore>
          </FilterProvider>
        </SnackbarProvider>
      </UserStore>
    </AlertMessageStore>
  );
};
