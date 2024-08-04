import { Link, Outlet } from 'umi';
import styles from './index.less';
import routers from '@/routers';
import { StyleProvider, px2remTransformer } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';

const px2rem = px2remTransformer({
  rootValue: 14, // 32px = 1rem; @default 16
});

export default function Layout() {
  return (
    <StyleProvider transformers={[px2rem]}>
      <ConfigProvider
        theme={{
          cssVar: true,
          token: {
            motion: false,
            //算法
            algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
            // Seed Token，影响范围大
            colorPrimary: '#00b96b',
            borderRadius: 2,
            // 派生变量，影响范围小
            colorBgContainer: '#f6ffed',
          },
        }}
      >
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
      </ConfigProvider>
    </StyleProvider>
  );
}
