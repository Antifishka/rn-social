import db from "../../firebase/config";
import { authSlice } from "./auth-reducer";

export const authSingUpUser = ({ email, password, nickname }) => async(dispatch) => {
    try {
        await db.auth().createUserWithEmailAndPassword(email, password); 

        const user = await db.auth().currentUser;

        await user.updateProfile({
            displayName: nickname
        })

        const { uid, displayName } = await db.auth().currentUser;
        console.log('uid, displayName', uid, displayName);

        dispatch(authSlice.actions.updateUserProfile({
            userId: uid,
            nickname: displayName,
        }));

    } catch (error) {
        console.log('error.message)', error.message);
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

export const authSingOutUser = () => (dispatch, getState) => { };

export const authStateChangeUser = () => async (dispatch, getState) => { 
    await db.auth().onAuthStateChanged((user) => setUser(user)); 
};