import { UserType } from 'types/user';
import styles from './styles.module.scss';

function UserInfo({ user }: { user: UserType }) {
  const { id, name, username, email, phone, website } = user;

  return (
    <div className={styles['container']}>
      <div className={styles['title']}>
        User Info
      </div>

      <div className={styles['table']}>
        <div>
          <div className={styles['item']}>
            <span>ID: </span> {id}
          </div>

          <div className={styles['item']}>
            <span>Name: </span>{name}
          </div>

          <div className={styles['item']}>
            <span>Username: </span>{username}
          </div>
        </div>

        <div>
          <div className={styles['item']}>
            <span>Email: </span> {email}
          </div>

          <div className={styles['item']}>
            <span>Phone: </span>{phone}
          </div>

          <div className={styles['item']}>
            <span>Website: </span>{website}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
