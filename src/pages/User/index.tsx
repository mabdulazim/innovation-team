import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
import PostsList from 'components/Post/List';
import UserInfo from 'components/User/Info';
import { getUser } from 'services/userService';
import { UserType } from 'types/user';

function UserPage() {
  const { id } = useParams();
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    if(id) {
      const getUserData = async() => {
        const post = await getUser(id);
        setUser(post);
      }

      getUserData();
    }
  } , [id]);

  return (
    <Fragment>
      {user ?
        <Fragment>
          <h1>{user.username} Post's</h1>
          <UserInfo user={user} />
          <PostsList
            isUserPage
            defaultUserId={id}
          />
        </Fragment>

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
  
export default UserPage;