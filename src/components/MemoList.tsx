import React, { useState, useEffect, useContext, memo } from 'react'
import { db } from '../firebase'
import { FirebaseContext } from '../contexts'
import { Memo } from '../models'
import UpdateDeleteMemo from './UpdateDeleteMemo'
import { collectionName } from '../consts'

const MemoList: React.FC = () => {
  const [memos, setMemos] = useState<Memo[]>([
    { id: '', body: '', creater: '', createdAt: null, updatedAt: null },
  ])
  const { user } = useContext(FirebaseContext)

  useEffect(() => {
    if (user) {
      const unsub = db
        .collection(collectionName.memos)
        .where('creater', '==', user.email)
        .onSnapshot((snapshot) => {
          // DBからメモ一覧を取得
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            body: doc.data().body,
            creater: doc.data().creater,
            createdAt: doc.data().createdAt,
            updatedAt: doc.data().updatedAt,
          }))
          // 取得したメモ一覧をcreatedAtの降順に並び替え
          data.sort((a, b) => {
            const x = a.createdAt
            const y = b.createdAt
            if (!x || !y) return 1
            if (x < y) {
              return 1
            } else {
              return -1
            }
          })
          setMemos(data)
        })

      return () => unsub()
    }
  }, [])

  return (
    <div className='wrap-memo-list'>
      {memos &&
        memos.map((memo) => <UpdateDeleteMemo key={memo.id} memo={memo} />)}
    </div>
  )
}

export default MemoList
