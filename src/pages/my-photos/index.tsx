import Layout from '@/components/layout'
import { useUserAuth } from '@/context/userAuthContext'
import { getPostByUserId } from '@/repository/post.service'
import { DocumentResponse, Post } from '@/types'
import { HeartIcon } from 'lucide-react'
import  { useEffect, useState } from 'react'



const MyPhotos = () => {
  const {user} = useUserAuth()
  const [data,setData] = useState<DocumentResponse[]>([])


  const getAllPosts  = async (id: string) => {
    try {
        const querySnapshot = await getPostByUserId(id)
        const tempArr:DocumentResponse[] =[]  
        if(querySnapshot?.size > 0) {
          querySnapshot?.forEach((doc) => {
            const data =doc?.data() as Post
            const responseObj:DocumentResponse  ={
              id: doc.id,
             ...data
            }
            tempArr.push(responseObj)
          })
          setData(tempArr)
        }
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    if(user != null) {
      getAllPosts(user.uid)
    }
  },[])

  const renderPosts = () => {
    return data.map((item) => {
      return (
        <div key={item.photos![0].uuid} className="relative">
          <div className="absolute group transition-all duration-200 bg-transparent hover:bg-slate-950 hover:bg-opacity-75 top-0 bottom-0 left-0 right-0 w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <HeartIcon className="hidden group-hover:block fill-white" />
              <div className="hidden group-hover:block text-white">
                {item.likes} likes
              </div>
            </div>
          </div>
          <img
            src={`${item.photos![0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center/`}
          />
        </div>
      );
    });
  };

  

  return (
    <Layout>
      <div className='flex justify-center'>
        <div className="border max-w-3xl w-full">
          <h3 className="bg-slate-800 text-white text-center text-lg p-2">My Photos</h3>
          <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data ? renderPosts() :<div>Loading...</div>}
          </div>
        </div>
        </div>
   
      </div>
    </Layout>
  )
}

export default MyPhotos