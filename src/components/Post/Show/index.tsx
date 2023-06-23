import { Fragment } from 'react';
import { PostType } from 'types/post';
import CommentsList from '../../Comment/List';
import styles from './styles.module.scss';

function PostDetails({ post }: { post: PostType }) {
  const { id, title, body } = post;

  return (
    <Fragment>
      <div className={styles['container']}>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>

      <CommentsList postId={id?.toString()} />
    </Fragment>
  );
}

export default PostDetails;
