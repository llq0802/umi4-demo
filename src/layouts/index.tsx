import { NavLink, Outlet } from 'umi';
import styles from './index.less';
import routers from '@/routers';
import { StyleProvider, px2remTransformer } from '@ant-design/cssinjs';
import { ConfigProvider, theme } from 'antd';

const px2rem = px2remTransformer({
  rootValue: 14, // 32px = 1rem; @default 16 不能与cssVar同时启用
});

export default function Layout() {
  return (
    <StyleProvider transformers={[px2rem]}>
      <ConfigProvider
        theme={{
          cssVar: true,
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
          token: {
            motion: false,
            //算法
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
                  <NavLink
                    to={item.path}
                    style={({ isActive }) => {
                      return {
                        color: isActive ? '#00b96b' : '#000',
                        fontWeight: isActive ? 'bold' : 'normal',
                      };
                    }}
                  >
                    {item.title}
                  </NavLink>
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
