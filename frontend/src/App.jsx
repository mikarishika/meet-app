import React from 'react'
import { Routes, Route, Navigate } from 'react-router';
import ChatPage from './pages/ChatPage.jsx';
import HomePage from "./pages/HomePage.jsx";
import LoginPage from './pages/LoginPage.jsx';
import NotficationPage from './pages/NotficationPage.jsx';
import OnboardingPage from './pages/OnboardingPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import CallPage from './pages/CallPage.jsx';
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import PageLoader from './components/PageLoader.jsx';
import useAuthUser from './hooks/useAuthUser.js';

const App = () => {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded

  // if (isLoading) return <PageLoader />;

  return (
    <div className=" h-screen text-5xl " data-theme="coffee" >
      <Routes>
        <Route path='/' element={isAuthenticated && isOnboarded ?
          (<HomePage />) :
          (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)}></Route>

        <Route path='/signup' element={!isAuthenticated ? <SignUpPage /> : <Navigate to="/" />}></Route>
        <Route path='/login' element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}></Route>
        <Route path='/notfication' element={isAuthenticated ? <NotficationPage /> : <Navigate to="/login" />}></Route>
        <Route path='/call' element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}></Route>
        <Route path='/chat' element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" />}></Route>
        <Route path='/onboarding' element={<OnboardingPage />}></Route>
        {/* <Route path='/onboarding' element={isAuthenticated ? <OnboardingPage /> : <Navigate to="/login" />}></Route> */}
      </Routes>
      <Toaster />
    </div>
  )
}

export default App;
