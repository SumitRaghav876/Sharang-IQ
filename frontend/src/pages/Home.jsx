import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import React from 'react'
import toast from 'react-hot-toast';

function Home() {
  return (
    <div> 
      <button className='btn btn-secondary' onClick={()=> toast.error("This is error message")}>Click me</button>
      <br />
      <br />
      <div className='btn btn-primary'>
        <SignedOut >
          <SignInButton mode='modal'/>
        </SignedOut>
        <SignedIn>
          <SignOutButton/>
          <UserButton/>
        </SignedIn>
      </div>
    </div>
  )
}

export default Home
