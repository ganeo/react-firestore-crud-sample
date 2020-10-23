import React, { useContext } from 'react'
import { logout } from '../firebase'
import { FirebaseContext } from '../contexts'
import CreateMemo from '../components/CreateMemo'
import MemoList from '../components/MemoList'

const Home = () => {
  const { user } = useContext(FirebaseContext)

  return (
    <>
      <header className='header-page'>
        <h1>Home(要ログイン)</h1>
        <div className='wrap-header-page'>
          <p>
            <strong>{user?.email}でログイン中</strong>
          </p>
          <button onClick={logout}>ログアウト</button>
        </div>
      </header>
      <div className='wrap-home'>
        <CreateMemo />
        <MemoList />
      </div>
    </>
  )
}

export default Home
