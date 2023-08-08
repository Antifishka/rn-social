import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUserProfile, authStateChange, authSignOut } from "./auth-reducer";

export const authSingUpUser = ({ email, password, nickname }) => async(dispatch) => {
    try {
        await createUserWithEmailAndPassword(auth, email, password); 

        const user = await auth.currentUser;

        await user.updateProfile({
            displayName: nickname
        })

        const { uid, displayName } = await auth.currentUser;
        console.log('uid, displayName', uid, displayName);

        dispatch(updateUserProfile({
            userId: uid,
            nickname: displayName,
        }));

    } catch (error) {
        console.log('error.message', error.message);
    }
};
 
export const authSingInUser = ({ email, password }) => async(dispatch, getState) => { 
    try {
        const user = await db
            .auth()
            .signInWithEmailAndPassword(email, password); 

        console.log('user', user);

      

    } catch (error) {
        console.log('error.message)', error.message);
    } 
};

export const authSingOutUser = () => async (dispatch, getState) => { 
    await db.auth().signOut();

    dispatch(authSignOut());
};

export const authStateChangeUser = () => async (dispatch, getState) => { 
    await db.auth().onAuthStateChanged((user) => {
        if (user) {
            const newUser = {
                nickname: user.displayName,
                userId: user.uid,
            }

            dispatch(authStateChange({ stateChange: true }));
            dispatch(updateUserProfile(newUser));
        }
    }); 
};