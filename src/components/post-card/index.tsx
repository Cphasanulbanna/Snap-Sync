import { useUserAuth } from '@/context/userAuthContext';
import { DocumentResponse } from '@/types';
import * as React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { HeartIcon, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { updateLikesOnPost } from '@/repository/post.service';

interface IPostCardProps {
  data: DocumentResponse
}

const PostCard: React.FunctionComponent<IPostCardProps> = ({data}) => {
  const {user} = useUserAuth()
  const [likesInfo, setLikesInfo] = React.useState<{likes: number, isLike:boolean}>({isLike: data?.userLikes?.includes(user?.uid) ? true : false, likes: data.likes})

  const updateLike = async (isVal: boolean) => {
    setLikesInfo({
      likes: isVal ? likesInfo.likes + 1 : likesInfo.likes - 1,
      isLike: !likesInfo.isLike
    })
    if(isVal) {
      data.userLikes.push(user?.uid)
    }
    else {
      data.userLikes?.splice(data.userLikes.indexOf(user?.uid), 1)
    }

    await updateLikesOnPost(data?.id!, data?.userLikes,isVal ? likesInfo?.likes + 1 : likesInfo.likes -1)
  }
  return <Card className='mb-6'>
    <CardHeader className='flex flex-col p-3'>
      <CardTitle className='text-sm text-center flex justify-start items-center'>
        <span className="mr-2">
          <img src="" alt="profile image" className="w-10 h-10 rounded-full border-2 border-slate-800 object-cover" />
        </span>
        <span>Guest User</span>
      </CardTitle>
    </CardHeader>
    <CardContent className='p-0'>
      <img src={data?.photos ? data?.photos?.[0]?.cdnUrl: ""} alt="" />
    </CardContent>
    <CardFooter className='flex flex-col p-3'>
      <div className="flex justify-between w-full mb-3">
        <HeartIcon onClick={() =>updateLike(!likesInfo?.isLike)} className={cn("mr-3", "cursor-pointer", likesInfo?.isLike ? "fill-red-500": "fill-none")} />
        <MessageCircle className='mr-3'/>
      </div>
      <div className="w-full text-sm">{likesInfo.likes} likes</div>
      <div className="w-full text-sm">
        <span>Guest User:</span>{data.caption}
      </div>

    </CardFooter>
  </Card>
};

export default PostCard;
