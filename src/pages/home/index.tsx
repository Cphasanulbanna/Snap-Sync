import Layout from '@/components/layout'
import PostCard from '@/components/post-card'
import Stories from '@/components/stories'
import { Input } from '@/components/ui/input'
import { useUserAuth } from '@/context/userAuthContext'
import {  getPosts } from '@/repository/post.service'
import { DocumentResponse } from '@/types'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type Props = {}

const Home = (props: Props) => {
  const {user} = useUserAuth()
  const [data,setData]  =useState<DocumentResponse[]>([])

  const getAllPosts = async()=> {
    const response:DocumentResponse[] = (await  getPosts()) || []
    setData(response)
  }

  useEffect(() => {
    if(user != null) {
      getAllPosts()
    }
  }, [])

  const renderPosts = () => {
    return data.map((post) => (
      <PostCard key={post.id} data={post}/>
    ))
  }
  return (
   <Layout>
    <div className="relative mb-6 w-full text-gra-600">
      <Input className='border-2 border-gray-300 bg-white'
        placeholder='Search'
        type='search'
        name='search'
      />
      <button type='submit' className="absolute right-2 top-2">
        <Search  className='w-5 h-5 text-gray-400'/>
      </button>
    </div>
    <div className='mb-5 overflow-y-auto'>
      <h2 className='mb-5'>Stories</h2>
      <Stories />
    </div>
    <div className="mb-5">
      <h2 className="mb-5">Feed</h2>
      <div className="w-full flex justify-center">
        <div className="flex flex-col max-w-sm rounded-none">
          {data ? renderPosts() : <div>...Loading</div>}
        </div>
      </div>
    </div>
   </Layout> 
  )
}

export default Home