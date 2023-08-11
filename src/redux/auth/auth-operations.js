import {
    createUserWithEmailAndPassword,
    updateProfile,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUserProfile, authStateChange, authSignOut } from "./auth-slice";

export const authSingUpUser = ({ email, password, nickname }) => async (dispatch) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password); 

        await updateProfile(auth.currentUser, {
            displayName: nickname
        })

        const { uid, displayName } = await auth.currentUser;

        dispatch(updateUserProfile({
            userId: uid,
            nickname: displayName,
            email: email,
        }));

    } catch (error) {
        console.log('error', error);
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
            }

            dispatch(authStateChange({ stateChange: true }));
            dispatch(updateUserProfile(newUser));
        }
    }); 
};