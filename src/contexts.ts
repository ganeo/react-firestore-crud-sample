import React from 'react'
import firebase from 'firebase/app'

type FirebaseContextType = {
  user: firebase.User | null
}

export const FirebaseContext = React.createContext<FirebaseContextType>({
  user: null,
})
