import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { FirebaseContext } from './contexts'
import { Memo } from './models'

export const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
})

export const db = app.firestore()

export const loginWithEmail = async (email: string, password: string) => {
  try {
    await app.auth().signInWithEmailAndPassword(email, password)
  } catch (error) {
    alert(error)
  }
}

export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  try {
    await firebase.auth().signInWithPopup(provider)
  } catch (error) {
    alert(error)
  }
}

export const signupWithEmail = async (email: string, password: string) => {
  try {
    await app.auth().createUserWithEmailAndPassword(email, password)
  } catch (error) {
    alert(error)
  }
}

export const logout = () => {
  app.auth().signOut()
}

export const addDoc = async (collectionName: string, memo: Memo) => {
  try {
    await db.collection(collectionName).add(memo)
  } catch (error) {
    alert(error)
  }
}

export const updateDoc = async (collectionName: string, memo: Memo) => {
  try {
    await db.collection(collectionName).doc(memo.id).set(memo)
  } catch (error) {
    alert(error)
  }
}

export const deleteDoc = async (collectionName: string, memo: Memo) => {
  try {
    await db.collection(collectionName).doc(memo.id).delete()
  } catch (error) {
    alert(error)
  }
}

export const FirebaseProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    app.auth().onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div className='loading'>ローディング中...</div>
  }

  return (
    <FirebaseContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}
