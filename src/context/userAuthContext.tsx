import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { ProfileInfo } from "@/types";

interface IUserAuthProiderProps {
    children: React.ReactNode
}

type AuthContextData = {
    user: User | null,
    logIn: typeof logIn,
    signUp: typeof signUp,
    logOut: typeof logOut,
    googleSignIn: typeof googleSignIn,
    updateProfileInfo: typeof updateProfileInfo
}

const logIn  =(email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
}

const signUp  =(email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

const logOut = () => {
    signOut(auth)
}

const googleSignIn = () => {
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuthProvider)
}

const updateProfileInfo = (profileInfo: ProfileInfo) => {
    return updateProfile(profileInfo.user!, {
        displayName: profileInfo.displayName,
        photoURL: profileInfo.photoURL,
    })
}

export const userAuthContext = createContext<AuthContextData>({
    user: null,
    logIn,
    signUp,
    logOut,
    googleSignIn,
    updateProfileInfo
})

export const UserAuthProvider:React.FunctionComponent<IUserAuthProiderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,(user) => {
            if(user) {
                console.log("logged in user", user);
                setUser(user)
            }

            return () => {
                unsubscribe()
            }
        })
    })

    const value:AuthContextData = {
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        updateProfileInfo
    }
    return(
        <userAuthContext.Provider value={value}>
            {children}
        </userAuthContext.Provider>
    )
}

export const useUserAuth = () => {
    return useContext(userAuthContext)
}