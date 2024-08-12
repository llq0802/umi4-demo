import React from 'react';
import { createFromIconfontCN, StepBackwardOutlined } from '@ant-design/icons';
import { Space } from 'antd';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

const App: React.FC = () => (
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
);

export default App;
