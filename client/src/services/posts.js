import { where, collectionGroup, query, collection, onSnapshot, orderBy, addDoc, serverTimestamp, getDoc, doc, deleteDoc, setDoc, updateDoc, increment, getDocs, documentId } from "firebase/firestore";
import { db } from '../firebase'

export const getFeed = (setPosts) => {

    const postItems = query(collection(db, 'posts'), orderBy('timestamp', 'desc'))

      onSnapshot(postItems, (snapshot) => {
        let posts = snapshot.docs.map(doc => (
          {
            id: doc.id,
            data: doc.data()
          }
        ))
        setPosts(posts)
      })

}

export const getPostsByUser = (user) => new Promise((resolve, reject) => {

    const q = query(collection(db, "posts"), where("user", "==", user));

    getDocs(q)
    .then((res) => {
      let posts = res.docs.map(doc => (
        {
          id: doc.id,
          data: doc.data()
        }
      ))
      resolve(posts)
    })

})

export const getBookmarksById = (currentUser, setBookmarks) => {

  const bookmarkList = query(collectionGroup(db, 'bookmarks'), where('user', '==', currentUser))

  onSnapshot(bookmarkList, (snapshot) => {
      let bookmarks = snapshot.docs.map(doc => (doc.data().post))
      setBookmarks(bookmarks)
  })

}

export const getFeedOnce = () => new Promise((resolve, reject) => {

  getDocs(collection(db, 'posts'))
  .then((snapshot) => {
    let posts = snapshot.docs.map(doc => (
      {
        id: doc.id,
        data: doc.data()
      }
    ))
    resolve(posts)
  })

})

export const getBookmarkByPostId = (postId, uid) => new Promise((resolve, reject) => {

    getDoc(doc(db, 'posts', postId, 'bookmarks', uid))
    .then((res) => {
      resolve(res.exists())
    })

})

export const updateBookmark = (post, uid, currentBookmarkState) => {

    if (currentBookmarkState) {
      deleteDoc(doc(db, 'posts', post?.id, 'bookmarks', uid))
      updateDoc(doc(db, 'users', post?.data.user), {
        "stats.bookmarksCount": increment(-1)
      })
    }
    else {
      setDoc(doc(db, 'posts', post?.id, 'bookmarks', uid),{
        user: uid, 
        post: post?.id
      })
      updateDoc(doc(db, 'users', post?.data.user), {
        "stats.bookmarksCount": increment(1)
      })
    }
}

export const sendPost = (user, title, tag, details) => {

  addDoc(collection(db, "posts"),{
      user: user,
      title: title,
      tag: tag,
      details: details,
      votesCount: 0,
      commentsCount: 0,
      timestamp: serverTimestamp()
  })

}

export const getVoteByPostId = (postId,uid) => new Promise((resolve, reject) => {

  getDoc(doc(db, 'posts', postId, 'votes', uid))
    .then((res) => {
      if (!res.exists()) {
        resolve(null)
      }
      else {
        resolve(res.data().type)
      }
  })

})

export const updateVote = (postId, uid, currentVoteStateInst, type) => {

  if (currentVoteStateInst.state == null) {
    setDoc(doc(db, 'posts', postId, 'votes', uid),{
      type: type,
    })
    updateDoc(doc(db, 'posts', postId), {
      "votesCount": (type == 'up') ? increment(1) : increment(-1)
    })
  }
  else {
    if (currentVoteStateInst.state == type) {
        deleteDoc(doc(db, 'posts', postId, 'votes', uid))
        updateDoc(doc(db, 'posts', postId), {
          "votesCount": (type == 'up') ? increment(-1) : increment(1)
        })
    }
    else {

        updateDoc(doc(db, 'posts', postId, 'votes', uid), {
          "type": type
        })
        updateDoc(doc(db, 'posts', postId), {
          "votesCount": (type == 'up') ? increment(2) : increment(-2)
        })
    }
}
 
}

export const getComments= (postId) => new Promise((resolve, reject) => {

  // const postComments = query(collection(db, 'posts', postId, 'comments'), orderBy('timestamp', 'desc'))

  const postComments = query(collection(db, 'posts', postId, 'comments'))

  getDocs(postComments)
    .then((res) => {
      let comments = res.docs.map((value) => {
        const id = value.id;
        const data = value.data();
        return {id, ...data}
      })
      resolve(comments)
  })

})

export const sendComment = (post, parentId, comment, uid) => new Promise((resolve, reject) => {

  const newComment = {
    comment: comment,
    user: uid,
    parentId: (parentId == null) ? null : parentId,
    timestamp: serverTimestamp(),
  }

  addDoc(collection(db, 'posts', post?.id, 'comments'),{
    ...newComment
  }).then((res) => {
    resolve({
      ...newComment,
      id: res.id
    })
  })
  updateDoc(doc(db, 'posts', post?.id), {
    "commentsCount": increment(1)
  })
})

export const deleteComment = (postId, commentId) => new Promise((resolve, reject) => {

  deleteDoc(doc(db, 'posts', postId, 'comments', commentId)).then(() => {
    updateDoc(doc(db, 'posts', postId), {
      "commentsCount": increment(-1)
    })
    .then(() => {
      resolve()
    })
  })
})

export const updateComment = (postId, comment, commentId) => new Promise((resolve, reject) => {
  
  updateDoc(doc(db, 'posts', postId, 'comments', commentId), {
    "comment": comment
  })
  .then(() => {
    resolve()
  })

})