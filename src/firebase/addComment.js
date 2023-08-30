import { db } from './config';
import { collection, doc, addDoc } from "firebase/firestore"; 

export const addComment = async (data) => {
    try {
        const { postId, comment, userId, avatarURL } = data;
        
        const postRef = doc(db, "posts", postId); // find post
        const commentsListRef = collection(postRef, "comments"); // find comments collection
        const commentRef = await addDoc(commentsListRef, {
            comment,
            userId,
            avatarURL,
        });

        console.log("Document written with ID: ", commentRef.id);
    } catch (error) {
        console.log('error.message', error.message);
    }
};