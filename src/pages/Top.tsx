import React, { useContext, useEffect } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import LoginWithEmail from '../components/LoginWithEmail'
import LoginWithGoogle from '../components/LoginWithGoogle'
import SignupWithEmail from '../components/SignupWithEmail'
import { FirebaseContext } from '../contexts'
import paths from '../paths'

const Top: React.FC<RouteComponentProps> = ({ history }) => {
  const { user } = useContext(FirebaseContext)

  useEffect(() => {
    user && history.push(paths.home)
  }, [history])

  return (
    <div className='wrap-top'>
      <div className='wrap-login'>
        <div>
          <LoginWithEmail />
        </div>
        <hr />
        <div>
          <LoginWithGoogle />
        </div>
      </div>
      <div className='wrap-signup'>
        <SignupWithEmail />
      </div>
    </div>
  )
}

export default withRouter(Top)
