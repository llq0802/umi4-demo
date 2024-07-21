import { createInstance } from 'antd-style';
import React from 'react';

const { createStyles, ThemeProvider } = createInstance<ForDemoToken>({
  key: 'test-css',
  hashPriority: 'low',
  prefixCls: 'for-demo',
  iconPrefixCls: 'for-demo-icon',
});

const useStyles = createStyles((params, props) => {
  console.log('==createInstance-params====>', params);
  // console.log('==props====>', props);
  const { token, css, cx, prefixCls } = params;

  return {
    // 支持 css object 的写法
    container: {
      backgroundColor: token.colorBgLayout,
      borderRadius: token.borderRadiusLG,
      width: 180,
      height: 180,
      color: 'red',
    },
    card: {
      backgroundColor: '#000',
      borderRadius: token.borderRadiusLG,
      width: 100,
      height: 100,
      color: 'red',
      '&:hover': {
        backgroundColor: '#fff',
      },
    },
  };
});

export default function Index() {
  const { styles, cx, theme } = useStyles({ id: 999 });
  return (
    <>
      <div className={styles.container}>container</div>;<div className={styles.card}>card</div>;
    </>
  );
}
