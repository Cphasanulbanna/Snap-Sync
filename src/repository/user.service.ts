import { db } from "@/firebaseConfig";
import { ProfileResponse, UserProfile } from "@/types";
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

const COLLECTION_NAME = "users"

export const createUserProfile = (user: UserProfile) => {
    try {
        return addDoc(collection(db, COLLECTION_NAME), user)
    } catch (error) {
        console.log(error);
        
    }
}

export const getUserProfile = async (userId: string) => {
    try {
            const q = query(collection(db, COLLECTION_NAME), where("userId", "==",userId))
            let tempData:ProfileResponse = {}
            const querySnapShots = await  getDocs(q)
            if(querySnapShots.size > 0) {
                querySnapShots?.forEach((item) => {
                    const userData = item.data() as UserProfile
                    tempData = {
                        id: item.id,
                        ...userData
                    }
                })
                return tempData
            }
            else {
                return null
                
            }
    } catch (error) {
        console.log(error);
            
    }
}


export const updateUserProfile = async (id: string, user: UserProfile) => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id)
        return updateDoc(docRef, {
            ...user

        })
    } catch (error) {
    console.log(error);
     
    }   
}

export const getAllUsers = async(userId:string) => {
    try {
            const querySnapShots = await getDocs(collection(db,COLLECTION_NAME))
            const tempArray:ProfileResponse[] = []
            if(querySnapShots.size > 0) {
                  querySnapShots.forEach((obj) => {
                          const data = obj.data() as UserProfile
                          const responseObj:ProfileResponse  ={
                              id: obj.id,
                              ...data
                          }
                          tempArray.push(responseObj)
                      })
                      return tempArray?.filter((item) => item.userId !== userId)
            }
            else {
                console.log("no data");
                
            }
    } catch (error) {
        console.log(error);
        
    }
}