import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import './App.css';
import Home from './components/Home/Home';
import MovieDetails from './components/MovieDetails/MovieDetails';
import NavBar from './components/NavBar/NavBar';
import Search from './components/Search/Search';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import { GuestRoute } from './guards/GuestRoute';
import { UserRoute } from './guards/UserRoute';
import store from './store/store';

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <BrowserRouter>
          <Routes>

            <Route element={<GuestRoute />}>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
            </Route>

            <Route element={<UserRoute />}>
              <Route path="/" element={<Navigate to={'/home'} />} />
              <Route path="/home" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/movies/:id" element={<MovieDetails />} />
            </Route>

            <Route path='*' element={<Navigate to={'/home'} />} />

          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider >
  );
}

export default App;
