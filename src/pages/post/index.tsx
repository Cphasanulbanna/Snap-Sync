import FileUploader from '@/components/file-uploader';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUserAuth } from '@/context/userAuthContext';
import { createPost } from '@/repository/post.service';
import { FileEntry, PhotoMeta, Post } from '@/types';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';



const CreatePost: React.FunctionComponent = () => {
  const navigate = useNavigate()
  const {user} = useUserAuth()
  const [fileEntry, setFileEntry] =React.useState<FileEntry>({
    files:[]
  })
  const [post, setPost] = React.useState<Post>({
    caption: '',
    photos: [  ],
    likes: 0,
    userLikes: [],
    userId: null,
    date: new Date(),
  })

  const handleSubmit = async(e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("file entry", fileEntry);
    console.log("created post", post);

    const photoMeta:PhotoMeta[] = fileEntry.files.map((file) => {
      return {cdnUrl: file.cdnUrl!, uuid: file.uuid!}
    })

    if(user != null) {
      const newPost:Post = {
        ...post,
        userId: user?.uid || null,
        photos: photoMeta,
        username: user.displayName!,
        photoURL: user.photoURL!
      }
      await createPost(newPost)
      navigate("/")
    }
    else {
      navigate("/login")
    }

    
    
  }
  return <Layout>
    <div className="flex justify-center">
      <div className="border max-w-3xl w-full">
        <h3 className='bg-slate-800 text-white text-center text-lg p-2'>Create Post</h3>
        <div className="p-8">
          <form action="" onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <Label className='mb-4' htmlFor='caption'>Photo Caption</Label>
              <Textarea className='mb-8'
               id='caption' placeholder='what is in your photo'
               value={post.caption}
               onChange={(e) => setPost({...post, caption: e.target.value})}
               ></Textarea>
              <div className="flex flex-col gap-4">
                <Label  className='mb-4' htmlFor='photo'>Photos</Label>
                <FileUploader fileEntry={fileEntry} onChange={setFileEntry} preview={true}/>
              </div>
              <Button className='mt-8 w-32' type='submit'>Post</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </Layout>
};

export default CreatePost;
