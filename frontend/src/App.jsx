import './App.css'
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <>
      <h1>Welcome to the app</h1>
      <SignedOut>
        <SignInButton mode='modal'/>
      </SignedOut>
      <SignedIn>
        <SignOutButton/>
        <UserButton/>
      </SignedIn>
    </>
  )
}

export default App;
