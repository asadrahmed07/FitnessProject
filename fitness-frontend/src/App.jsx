import { useEffect, useState } from 'react'
//import './App.css'
import Button from '@mui/material/Button'
import { BrowserRouter as Router, Navigate,Route, Routes, useLocation } from 'react-router'
import { AuthContext } from 'react-oauth2-code-pkce'
import { setCredentials } from './store/authSlice';
import { useContext } from 'react'
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import ActivityDetail from './components/ActivityDetail';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList'; 


const ActivitiesPage = () => {
  return (
    <Box sx={{ p: 2, border: '1px dashed grey' }}>
      <ActivityForm onActivityAdded = { () => window.location.reload()}/>
      <ActivityList/>
    </Box>
  );
}

function App() {
  const {token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext); 
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if(token) {
      dispatch(setCredentials({token, user: tokenData}));
      setAuthReady(true);
    }
  } , [token , tokenData, dispatch]);

  return (
    <>
    <Router>
      {!token ? (
        <Button variant="contained" color="primary" onClick={() => {logIn()}}>
          LOGIN
        </Button>
      ) : (
        <div>
          <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <Button variant="contained" color="primary" onClick={() => {logOut()}}>
              LOGOUT
            </Button>
          </Box>
          <Routes>
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route path="/" element={token? <Navigate to="/activities" replace/> : <div>Welcome ! Please Login</div>} />
          </Routes>
        </div>
      )}
    </Router>
      
    </>
  )
}

export default App
