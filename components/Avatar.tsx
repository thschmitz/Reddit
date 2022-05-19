import { useSession } from 'next-auth/react'
import Image from 'next/image';
import React from 'react'

const Avatar = () => {

    const {data: session} = useSession();

    return (
        <div className="relative h-10 w-10 rounded-full border-gray-300 bg-white">
            <Image layout="fill" src={`https://avatars.dicebear.com/api/open-peeps/${session?.user?.name || 'placeholder'} `} />
        </div>
    )
}

export default Avatar