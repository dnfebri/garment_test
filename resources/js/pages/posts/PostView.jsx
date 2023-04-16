import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from "../../components/layout/Layout";
import Loading from '../../components/utils/Loading';
import Notes from '../../components/note/Notes';
import PostViewDetail from './PostViewDetail';
import { HiArrowLeft } from "react-icons/hi";

const PostView = () => {
  const navigate = useNavigate();
  const {uuid} = useParams();
  const [post, setPost] = useState({});
  const [notes, setNotes] = useState({});

  const getPostUuid = async (idx) => {
    try {
      const response = await axios.get(APP_URL_API+`post/${uuid}`, {
        headers: {
          Authorization : `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      const data = await response.data;
      setPost(response.data.data);
      setNotes(response.data.notes);
    } catch (error) {
      console.log("error getRoleById", error);
    }
  }

  useEffect(() => {
    getPostUuid()
  }, []);
  
  return (
    <Layout>
      {!post.uuid ? (
        <Loading />
      ) : (
        <div>
          <button 
            onClick={() => navigate(-1)} 
            className=' inline-flex items-center gap-2 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-gray-500 mr-2"'
          >
            <HiArrowLeft /> Go back
          </button>
          <PostViewDetail data={post} />
          <Notes data={notes} />
        </div>
      )}
    </Layout>
  )
}

export default PostView