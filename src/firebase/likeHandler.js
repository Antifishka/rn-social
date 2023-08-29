import {
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore'
import { db } from '../firebase/config'

export const likeHandler = async (likes, postId, userId) => {
  const postRef = doc(db, "posts", postId);

  if (!likes.includes(userId)) {
    await updateDoc(postRef, {
      likesCount: increment(1),
      likes: arrayUnion(userId),
      isLiked: true,
    })
  } else {
    await updateDoc(postRef, {
      likesCount: increment(-1),
      likes: arrayRemove(userId),
      isLiked: false,
    })
  }
}