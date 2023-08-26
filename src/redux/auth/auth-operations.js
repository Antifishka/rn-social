import {
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { uploadPhotoToServer } from "../../firebase/uploadPhotoToServer";
import { updateUserProfile, authStateChange, authSignOut, addUserPhoto, removeUserPhoto } from "./auth-slice";

export const authSingUpUser = ({ email, password, nickname, avatar }) => async (dispatch) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password); 

        if (avatar) {
            const avatarURL = await uploadPhotoToServer(avatar, 'avatarImages');
            await updateProfile(auth.currentUser, {
                displayName: nickname,
                photoURL: avatarURL,
            })
        } else {
            await updateProfile(auth.currentUser, {
                displayName: nickname,
            })
        };

        const { uid, displayName, photoURL } = await auth.currentUser;

        dispatch(updateUserProfile({
            userId: uid,
            nickname: displayName,
            email: email,
            avatarURL: photoURL,
        }));

    } catch (error) {
        console.log('error.message', error.message);
    }
};
 
export const authSingInUser = ({ email, password }) => async () => { 
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log('error.message)', error.message);
    } 
};

export const authSingOutUser = () => async (dispatch) => { 
    await signOut(auth);

    dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch) => { 
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const newUser = {
                nickname: user.displayName,
                userId: user.uid,
                email: user.email,
                avatarURL: user.photoURL,
            }

            dispatch(authStateChange({ stateChange: true }));
            dispatch(updateUserProfile(newUser));
        }
    }); 
};

export const addUserPhotoToServer = (avatar) => async (dispatch) => {
    try {
        const avatarURL = await uploadPhotoToServer(avatar, 'avatarImages');

        await updateProfile(auth.currentUser, {
            photoURL: avatarURL,
        })

        const { photoURL } = await auth.currentUser;

        dispatch(addUserPhoto({
            avatarURL: photoURL,
        }));
        
    } catch (error) {
        console.log('error', error);
        console.log('error.message', error.message);
    } 
};

export const removeUserPhotoFromServer = () => async (dispatch) => {
    try {
        await updateProfile(auth.currentUser, {
            photoURL: null,
        })

        dispatch(removeUserPhoto());
        
    } catch (error) {
        console.log('error', error);
        console.log('error.message', error.message);
    } 
};