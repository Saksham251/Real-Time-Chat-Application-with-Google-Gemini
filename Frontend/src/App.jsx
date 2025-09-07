import React from 'react'
import AppRoutes from './Routes/AppRoutes'
import { UserProvider } from './context/user.context'
const App = () => {
  return (
    <div>
      <UserProvider>
        <AppRoutes/>
      </UserProvider>
    </div>
  )
}

export default App
