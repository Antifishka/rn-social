import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadPhotoToServer = async (photo, folderName) => {
    const response = await fetch(photo);
    const file = await response.blob(); // change format to Blob

    const imageId = Date.now().toString();

    const imageRef = ref(storage, `${folderName}/${imageId}`);

    await uploadBytes(imageRef, file); // upload image
        
    const imageURL = await getDownloadURL(imageRef); // get image URL
    console.log('imageURL', imageURL);

    return imageURL;
}