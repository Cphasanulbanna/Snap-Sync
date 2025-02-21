import { Button } from '@/components/ui/button';
import { useUserAuth } from '@/context/userAuthContext';
import { getAllUsers } from '@/repository/user.service';
import { ProfileResponse } from '@/types';
import { User2 } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

const UserList: React.FunctionComponent = () => {
    const {user} = useUserAuth()
    const [suggestedUsers, setSuggestedUsers] = React.useState<ProfileResponse[]>([])

    const getSuggestedUsers = async(userId: string) => {
        const response = await getAllUsers(userId) || []
        setSuggestedUsers(response)
    }

    React.useEffect(() => {
        if(user?.uid != null) {
            getSuggestedUsers(user.uid)
        }
    },[])


    const renderUsers = () => {
        return suggestedUsers.map((user, index) => (
            <Link key={index} to={`/profile/${user.userId}`}>
                <div className="flex flex-row items-center border-b mb-4 border-gray-400 justify-start">
                    <span className="mr-2">
                        {user.photoURL? <img src={user.photoURL} className='w-10 h-10 rounded-full border-2 border-slate-800' alt="user"/> : <User2 />}
                    </span>
                    <span className="text-xs">
                        {user.displayName ?? 'Guest User'}
                    </span>
                    <Button className='text-xs p-3 py-2 h-6 bg-slate-900 last-of-type:ml-auto'>
                        Follow
                    </Button>
                </div>
            </Link>
        ))
    }

  return <div className='text-white py-8 px-3'>
   <Link to={"/profile"}>
   <div className="flex flex-row items-center border-b pb-4 border-gray-400 cursor-pointer">
        <span className="mr-2">
            {user?.photoURL ? <img src={user.photoURL} className='w-10 h-10 rounded-full border-2 border-slate-800' alt="user"/> : <User2 />}
        </span>
        <span className="text-sm">
            {user?.displayName ? user.displayName : "Guest User"}
        </span>
    </div>
   </Link>
   <h3 className="sm text-slate-300">Suggested Friends</h3>
   <div className="my-4">
        {suggestedUsers?.length > 0 ? renderUsers() : ""}
   </div>
  </div>
};

export default UserList;
