import { SignOutButton } from '@clerk/clerk-react'
import React from 'react'

const Dashboard = () => {
  return (
    <div>
      Dashboard Page
      <br />
      <br />
      <SignOutButton className="btn btn-primary"></SignOutButton>
    </div>
  )
}

export default Dashboard
