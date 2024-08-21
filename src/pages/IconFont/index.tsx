import React, { useRef } from 'react';
import { createFromIconfontCN, StepBackwardOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import { format } from 'sql-formatter';
import { useMount } from 'ahooks';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
const formatSql = format('SELECT * FROM tbl', {
  language: 'mysql',
  tabWidth: 2,
  keywordCase: 'upper',
  linesBetweenQueries: 2,
});

const App: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  useMount(() => {
    // 使用insertAdjacentHTML方法插入HTML
    // 'beforebegin'：在目标元素之前插入
    // 'afterbegin'：在目标元素内部的第一个子元素之前插入
    // 'beforeend'：在目标元素内部的最后一个子元素之后插入
    // 'afterend'：在目标元素之后插入
    const p = document.createElement('p');
    p.textContent = 'aaa';
    ref.current?.insertAdjacentElement('beforeend', p);
    ref.current?.insertAdjacentHTML('beforeend', '<span class="input-cursor">999</span>');
  });

  return (
    <div ref={ref}>
      <Space>
        <StepBackwardOutlined />
        <IconFont
          type="icon-tuichu"
          rotate={90}
          style={{
            fontSize: 24,
          }}
        />
        <IconFont type="icon-facebook" />
        <IconFont type="icon-twitter" />
      </Space>
      <pre>{formatSql}</pre>
    </div>
  );
};

export default App;
