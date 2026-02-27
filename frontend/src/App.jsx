import { Navigate, Route, Routes } from 'react-router-dom';
import { useUser } from "@clerk/clerk-react"

import Home from "./pages/Home.jsx";
import ProblemsPage from './pages/ProblemsPage.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
  const { isSignedIn }=useUser();
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/problems' element={isSignedIn ? <ProblemsPage/> : <Navigate to="/" />}/>
      </Routes>
      <Toaster/>
    </>
  )
}

export default App;
