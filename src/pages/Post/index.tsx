import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import PostDetails from "components/Post/Show";
import { getPost } from 'services/postService';
import { PostType } from 'types/post';

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<PostType>();

  useEffect(() => {
    if(id) {
      const getPostData = async() => {
        const post = await getPost(id);
        setPost(post);
      }

      getPostData();
    }
  } , [id]);

  return (
    <Fragment>
      <h1>Post Details</h1>
      {post ?
        <PostDetails post={post} />
      :
        <div>
          <Skeleton variant="rectangular" height={120} sx={{ marginBottom: '1rem' }} />
          <Skeleton variant="rectangular" height={120} sx={{ marginBottom: '1rem' }} />
          <Skeleton variant="rectangular" height={120} sx={{ marginBottom: '1rem' }} />
        </div>
      }
    </Fragment>
  );
}
  
export default PostPage;