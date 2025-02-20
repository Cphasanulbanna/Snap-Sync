import { db } from "@/firebaseConfig";
import { Post } from "@/types";
import { addDoc, collection, getDocs, orderBy, query } from "firebase/firestore";

const COLLECTION_NAME = "posts"

const createPost = (post:Post) => {
    return addDoc(collection(db, COLLECTION_NAME), post)
}

const getPosts = () => {
    const q = query(collection(db,COLLECTION_NAME), orderBy("date", "desc"))
    return getDocs(q)
}