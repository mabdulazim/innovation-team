import { ChangeEvent, useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import CommentItem from './Item';
import { getComments } from 'services/commentService';
import { CommentType } from 'types/post';
import styles from './styles.module.scss';
import CreateComment from '../Create';

function CommentsList({ postId }: { postId: string }) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  
  const numOfPosts = 10;
  const numOfPages = Math.ceil(count / 10);
  
  useEffect(() => {
    const getCommentsData = async() => {
      const params = {
        _page: page,
        _limit: numOfPosts
      }
      const { data, count } = await getComments(postId, params);
      setComments(data);
      setCount(count);
    }

    if(postId) {
      getCommentsData();
    }
  }, [postId, page]);

  const handlePageChange = (page: number) => {
    setPage(page);
  }

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <h3>Comments ({comments.length})</h3>

        <CreateComment postId={postId} />
      </div>
      
      {comments.map(comment => {
        return <CommentItem key={comment.id} comment={comment} />
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

export default CommentsList;
