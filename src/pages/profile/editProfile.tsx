import FileUploader from '@/components/file-uploader';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUserAuth } from '@/context/userAuthContext';
import { updateProfileInfoOnPost } from '@/repository/post.service';
import { createUserProfile, updateUserProfile } from '@/repository/user.service';
import { FileEntry, ProfileInfo, UserProfile } from '@/types';
import { User } from 'lucide-react';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';



const EditProfile: React.FunctionComponent = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {user, updateProfileInfo} = useUserAuth()
    const {id, userId, displayName, userBio, photoURL} = location.state
    const [data, setData]=React.useState<UserProfile>({
         userId, displayName, userBio, photoURL
    })

      const [fileEntry, setFileEntry] =React.useState<FileEntry>({
        files:[]
      })

      const updateProfile = async(e:React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if(id) {
                await updateUserProfile(id,data)
            }
            else {
                 await createUserProfile(data)
            }
            const profileInfo:ProfileInfo = {
                user: user!,
                displayName: data.displayName,
                photoURL: data.photoURL
            }
            updateProfileInfo(profileInfo)
            updateProfileInfoOnPost(profileInfo)
            navigate('/profile')
        } catch (error) {
            console.log(error);
            
        }
       
      }

      React.useEffect(() => {
        if(fileEntry.files.length > 0) {
            setData({...data, photoURL: fileEntry.files[0].cdnUrl ?? ""})
        }
      }, [fileEntry])
  return <Layout>
  <div className="flex justify-center">
    <div className="border max-w-3xl w-full">
      <h3 className='bg-slate-800 text-white text-center text-lg p-2'>Edit Profile</h3>
      <div className="p-8">
        <form action="" onSubmit={updateProfile}>
        <div className="flex flex-col gap-4">
              <Label  className='mb-4' htmlFor='photo'>Profile Picture</Label>
              <div className="mb-4">
              {data?.photoURL || fileEntry?.files?.[0]?.cdnUrl ?    <img src={fileEntry.files?.[0]?.cdnUrl ??  data.photoURL} alt="" className="w-28 h-28 rounded-full border-2 border-slate-800 object-cover" /> :
                <User className='w-28 h-28 rounded-full border-2 border-slate-800 object-cover'/>}
            </div>
              <FileUploader fileEntry={fileEntry} onChange={setFileEntry} preview={false}/>
            </div>
            <div className="flex flex-col">
            <Label className='mb-4' htmlFor='displayName'>Display Name</Label>
            <Input className='mb-8'
             id='displayName' placeholder='Enter your user name'
             value={data.displayName}
             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData({...data, displayName: e.target.value})}
             />
          </div>
          <div className="flex flex-col">
            <Label className='mb-4' htmlFor='userBio'>Profile Bio</Label>
            <Textarea className='mb-8'
             id='userBio' placeholder='what is in your mind'
             value={data.userBio}
             onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData({...data, userBio : e.target.value})}
             ></Textarea>
        
        <div className="flex items-center gap-x-4">
            <Button className='mt-4 w-32 mr-8' type='submit'>Update</Button>
            <Button type='button' variant={"destructive"} className='mt-4 w-32 mr-8' onClick={() => navigate("/profile")}>Cancel</Button>
        </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</Layout>
};

export default EditProfile;
