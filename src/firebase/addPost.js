import { db } from './config';
import { collection, addDoc } from "firebase/firestore"; 
import { uploadPhotoToServer } from './uploadPhotoToServer';

export const addPost = async (postData) => {
    try {
        const { photo, title, locationName, latitude, longitude, userId } = postData;
        console.log('postData', postData)
        const imageURL = await uploadPhotoToServer(photo, 'postImages');

        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "posts"), {
            title,
            locationName,
            latitude,
            longitude, 
            imageURL,
            userId,
            likesCount: 0,
            likes: [],
        })

        console.log("Document written with ID: ", docRef.id);
    } catch (error) {
        console.log('error.message', error.message);
    }
};