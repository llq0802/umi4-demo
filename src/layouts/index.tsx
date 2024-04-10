import { Link, Outlet } from 'umi';
import styles from './index.less';
import routers from '@/routers';

export default function Layout() {
  return (
    <div className={styles.navs}>
      <ul>
        {routers.map((item, i) => {
          return (
            <li key={i}>
              <Link to={item.path}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <Outlet />
    </div>
  );
}
