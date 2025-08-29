import React, {useState, useEffect} from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";
export default function AllPost(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {}, []);
    service.getPosts().then([]).then((posts) => {
        if(posts){
            setPosts(posts.documents);
        }
    });
    return(
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="w-1/4 p-2">
                            <PostCard post={post}>
                            </PostCard>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}