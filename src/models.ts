import firebase from 'firebase/app'

export type Memo = {
    id?: string  //ドキュメント識別用ID(自動採番)
    body: string  //メモ本文
    creater: string | null  //作成者のメールアドレス
    createdAt: firebase.firestore.FieldValue | null  //作成日時
    updatedAt: firebase.firestore.FieldValue | null  //更新日時
}