import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './routes'
import { UserAuthProvider } from './context/userAuthContext'

type Props = {}

const App:React.FunctionComponent = (props: Props) => {
  return <UserAuthProvider>
     <RouterProvider router={router} />
  </UserAuthProvider>
}

export default App