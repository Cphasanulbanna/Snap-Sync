import { db } from "@/firebaseConfig";
import { DocumentResponse, Post, ProfileInfo } from "@/types";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from "firebase/firestore";

const COLLECTION_NAME = "posts"

export const createPost = (post:Post) => {
    return addDoc(collection(db, COLLECTION_NAME), post)
}

export const getPosts = async() => {
    const q = query(collection(db,COLLECTION_NAME), orderBy("date", "desc"))
    const querySnapShot = await getDocs(q)
    const tempArray:DocumentResponse[] = []
    if(querySnapShot?.size > 0) {
        querySnapShot.forEach((obj) => {
            const data = obj.data() as Post
            const responseObj:DocumentResponse  ={
                id: obj.id,
                ...data
            }
            tempArray.push(responseObj)
        })
        return tempArray
    }
    else {
        console.log("no document");
        
    }
    return getDocs(q)
}

export const getPostByUserId = (id:string) => {
    const q = query(collection(db, COLLECTION_NAME), where("userId", "==",id))
    return getDocs(q)
}

export const getPost = (id:string) => {
    const docRef = doc(db, COLLECTION_NAME,id)
    return getDoc(docRef)
}

export const deletePost = (id:string) => {
    return deleteDoc(doc(db, COLLECTION_NAME,id))
}

export const updateLikesOnPost = (id:string, userLikes: string[],likes:number) => {
    const docRef = doc(db, COLLECTION_NAME,id)
    return updateDoc(docRef, {
        likes:likes,
        userLikes: userLikes
    })
}   

export const updateProfileInfoOnPost  = async(ProfileInfo:ProfileInfo) => {
    const q = query(collection(db, COLLECTION_NAME), where("userId", "==",ProfileInfo.user?.uid))
   const querySnapShot = await getDocs(q)
   if(querySnapShot.size > 0) {
    querySnapShot?.forEach((obj) => {
        const docRef = doc(db, COLLECTION_NAME, obj.id)
        updateDoc(docRef, {
            userName: ProfileInfo.displayName,
            photoURL: ProfileInfo.photoURL
        })
 
    })
   }
   else {
    console.log("no data");
    
   }
}