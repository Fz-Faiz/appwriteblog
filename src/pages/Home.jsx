import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";

import {Container, PostCard} from '../components'

function Home() {
    const [posts, setPosts] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false);


    useEffect(() => {
        // Check if the user is authenticated
        appwriteService.checkAuth().then((authStatus) => {
            setIsAuthenticated(authStatus);
        });

        // Fetch posts if the user is authenticated
        if (isAuthenticated) {
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        }
    }, [isAuthenticated]);
  
    if (!isAuthenticated) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home