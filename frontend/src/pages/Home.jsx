import { useEffect, useState } from "react";
import API from "../API/axios";


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPosts = async () => {
        try {
            const response = await API.get('/post-get');
            setPosts(response.data.data);
        } catch (error) {
            console.error(error.response?.data?.message || "Fecthing post error");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPosts()
    }, []);

    return (
        <div className="min-h-screen flex bg-gray-200 items-center justify-center">
            {loading ? ( <div className="text-gray-600 text-lg">Lodaing posts...</div>) :
                (
                    <div className="flex flex-col w-full items-center">
                        <h1 className="font-bold text-2xl text-center mb-4 mt-6">Post Feed</h1>
                        {
                            posts.map((post) => (
                                <div key={post.id} className="shadow-lg w-full max-w-xl p-6 mb-3 bg-white rounded-lg">
                                    <h1 className="font-bold text-xl mb-2">{post.title}</h1>
                                    <p className=" text-gray-500 mb-3">{post.content}</p>
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center">
                                        <img src={post.author.avatar} className="w-8 rounded-full mr-2"></img>
                                        <p className="text-gray-600">{post.author.name}</p>
                                        </div>
                                        <button className="cursor-pointer border p-2 rounded-lg bg-blue-400 text-white hover:bg-blue-600 transition">❤️ {post.likes? post.likes : 0}</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Home;