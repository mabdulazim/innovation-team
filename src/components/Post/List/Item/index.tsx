import { Link } from 'react-router-dom';
import { PostType } from 'types/post';
import styles from './styles.module.scss';

function PostItem({ post }: { post: PostType}) {
  const { id, title, body, user } = post;

  return (
    <div className={styles['container']}>
      <h3>
        <Link to={`/post/${id}`}>{title}</Link>
      </h3>
      <p>{body}</p>
      <span>
        <Link to={`/user/${user.id}`}>{user.username}</Link>
      </span>
    </div>
  );
}

export default PostItem;
