import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { FirebaseContext } from './contexts'
import paths from './paths'

const PrivateRoute: React.FC<RouteProps> = ({ children, ...rest }) => {
  const { user } = useContext(FirebaseContext)
  return (
    <Route
      {...rest}
      render={() => (user ? children : <Redirect to={paths.top} />)}
    />
  )
}

export default PrivateRoute
