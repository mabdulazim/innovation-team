import { CommentType } from 'types/post';
import styles from './styles.module.scss';

function CommentItem({ comment }: { comment: CommentType}) {
  const { name, email, body } = comment;

  return (
    <div className={styles['container']}>
      <h3>{name}</h3>
      <span>{email}</span>
      <p>{body}</p>
    </div>
  );
}

export default CommentItem;
