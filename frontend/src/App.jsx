import { Navigate, Route, Routes } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react"

import Home from "./pages/Home.jsx";
import Dashboard from './pages/Dashboard.jsx';
import ProblemsPage from './pages/ProblemsPage.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isSignedIn,isLoaded }=useUser();
  if(!isLoaded) return null;
  return (
    <>
      <Routes>
        <Route path='/' element={ isSignedIn ? <Navigate to="/dashboard"/> : <Home /> }/>

        <Route path='/dashboard' element={ isSignedIn ? <Dashboard/> :  <Navigate to="/"/> }/>

        <Route path='/problems' element={isSignedIn ? <ProblemsPage/> : <Navigate to="/" />}/>
      </Routes>
      <Toaster toastOptions={{duration:3000}}/>
    </>
  )
}

export default App;
