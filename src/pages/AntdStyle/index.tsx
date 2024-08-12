import { Button } from 'antd';
import { createStyles, StyleProvider, ThemeProvider, useTheme, useThemeMode } from 'antd-style';
import Demo1 from './Demo1';

const useStyles = createStyles((params, props) => {
  console.log('==params====>', params);
  // console.log('==props====>', props);
  const { token, css, cx, prefixCls } = params;

  return {
    // 支持 css object 的写法
    container: {
      backgroundColor: token.colorBgLayout,
      borderRadius: token.borderRadiusLG,
      maxWidth: 400,
      width: '100%',
      height: 180,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    // 也支持通过 css 字符串模板获得和 普通 css 一致的书写体验
    card: css`
      color: ${token.colorTextTertiary};
      box-shadow: ${token.boxShadow};
      &:hover {
        font-weight: 600;
        color: ${token.colorTextSecondary};
        box-shadow: ${token.boxShadowSecondary};
      }
      padding: ${token.padding}px;
      border-radius: ${token.borderRadius}px;
      background-color: ${token.colorBgContainer};
      transition: all 300ms ${token.motionEaseInBack};
      margin-bottom: 8px;
      cursor: pointer;
    `,
    override: css`
      background-color: red;
      &.${prefixCls}-btn {
        background-color: ${token.colorWarning};
      }
    `,
  };
});

const Demo = ({ text }: { text?: string }) => {
  const { styles } = useStyles();

  return <Button className={styles.override}>{text ?? 'override to warning color'}</Button>;
};

export default () => {
  // styles 对象在 useStyles 方法中默认会被缓存，所以不用担心 re-render 问题
  const { styles, cx, theme } = useStyles({ id: 999 });

  const themeMode = useThemeMode();

  // console.log('==themeMode====>', themeMode);

  return (
    // 使用 cx 可以组织 className

    <>
      <StyleProvider prefix="lightd">
        <ThemeProvider
          // appearance="dark"
          prefixCls={'abc'}
        >
          <div className={cx('demo-classname', styles.container)}>
            <div className={styles.card}>createStyles Demo</div>

            {/* theme 对象包含了所有的 token 与主题等信息 */}
            <div>当前主题模式：{theme.appearance}</div>

            <Button className={styles.override}>测试</Button>
            <Demo></Demo>
          </div>
        </ThemeProvider>
      </StyleProvider>
      <Demo1></Demo1>
    </>
  );
};
