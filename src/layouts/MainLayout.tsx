import { Outlet, Link } from "react-router-dom";
import styles from './styles.module.scss';
import Login from "components/Login";

function MainLayout() {
  return (
    <div className={styles['main']}>
      <div className={styles['header']}>
        <div className={styles['logo']}>
          <Link to="/">Innovation Team Task</Link>
        </div>

        <Login />
      </div>

      <div className={styles['container']}>
        <Outlet />        
      </div>

      <div className={styles['footer']}>
        <span>Copyrights InnovationTeam by @Muhammad Abdul-Azim</span>
      </div>
    </div>
  );
}

export default MainLayout;
