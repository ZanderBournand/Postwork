import React from 'react'
import { db } from '../firebase'
import { where, collectionGroup, query, collection, onSnapshot, orderBy, addDoc, serverTimestamp, getDoc, doc, deleteDoc, setDoc, updateDoc, increment, getDocs, documentId } from "firebase/firestore";

export const getUserById = (id) => new Promise((resolve, reject) => {
    getDoc(doc(db, 'users', id))
    .then((res) => {
        resolve(res.exists ? res.data() : null)
    })
    .catch(() => reject())
})

export const updateUserAbout = (userId, newAbout) => {

    updateDoc(doc(db, 'users', userId), {
        "about": newAbout
    })

}

export const useless = ({userId, userModified}) => new Promise((resolve, reject) => {

    if (userId != null && userModified != null) {
        resolve()
    }
    else {
        reject()
    }

})
