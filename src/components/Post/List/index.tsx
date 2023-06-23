import { ChangeEvent, useMemo, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Pagination from '@mui/material/Pagination';
import PostItem from './Item';
import CreatePost from '../Create';
import { getPosts } from 'services/postService';
import { getUsers } from 'services/userService';
import { PostType } from 'types/post';
import styles from './styles.module.scss';

function PostsList(props: any) {
  const { isUserPage, defaultUserId } = props;
  const [posts, setPosts] = useState<PostType[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [count, setCount] = useState<number>(0);
  const [selectedUser, setSelectedUser] = useState<string>(defaultUserId || '');
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  const numOfPosts = 10;
  const numOfPages = Math.ceil(count / 10);

  useEffect(() => {
    getUsersData();
    return () => {
      debouncedCallback.cancel();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  useEffect(() => {
    const getPostsData = async() => {
      const params = {
        userId: selectedUser || '',
        q: searchKeyword,
        _page: page,
        _limit: numOfPosts
      }
      const { data, count } = await getPosts(params);
      const _posts = data.map((_p: PostType) => {
        return { ..._p, user: users.find(_u => _u?.id === _p.userId)}
      });
      setPosts(_posts);
      setCount(count);
    }

    if(users.length) {
      getPostsData();
    }
  }, [users, searchKeyword, page, selectedUser]);

  const getUsersData = async() => {
    const usersData = await getUsers();
    setUsers(usersData);
  }

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }

  const debouncedCallback = useMemo(() => debounce(handleSearchChange, 300), []);

  const handleUserChange = (e: any, newValue: any) => {
    setSelectedUser(newValue?.id || '');
  }

  const handlePageChange = (page: number) => {
    setPage(page);
  }

  return (
    <div className={styles['container']}>

      <div className={styles['header']}>
        <div className={styles['filters']}>
          <TextField
            onChange={debouncedCallback}
            id="outlined-basic"
            label="Search"
            variant="outlined"
          />

          {!isUserPage &&
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={
                users.map(user => ({
                  id: user.id,
                  label: user.username
                }))
              }
              sx={{ width: 300 }}
              renderInput={(params) => <TextField {...params} label="Users" />}
              onChange={handleUserChange}
            />
          }
        </div>
        
        {!isUserPage &&
          <CreatePost />
        }
      </div>

      {posts.length === 0 && (
        <div className={styles['noResults']}>
          <p>No results founded</p>
        </div>
      )}

      {posts.map(post => {
        return <PostItem key={post.id} post={post} />
      })}

      <div className={styles['pagination']}>
        <Pagination
          onChange={(e: ChangeEvent<unknown>, _p: number) => handlePageChange(_p)}
          count={numOfPages}
          showFirstButton
          showLastButton
        />
      </div>
    </div>
  );
}

export default PostsList;
