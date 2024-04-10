import React, { useState } from 'react';
import './index.less';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { Button } from 'antd';

const AnimationExample: React.FC = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="handle">
        <Button type="primary" onClick={() => setShow(!show)}>
          切换 {+show}
        </Button>
      </div>

      <CSSTransition
        in={show}
        timeout={500}
        classNames="fade"
        // mountOnEnter
        unmountOnExit
        // appear
        onEnter={(el, isAppearing) => console.log('开始进入')}
        onEntering={(el, isAppearing) => console.log('正在进入')}
        onEntered={(el, isAppearing) => console.log('进入完成')}
        onExit={(el) => console.log('开始退出')}
        onExiting={(el) => console.log('正在退出')}
        onExited={(el) => console.log('退出完成')}
      >
        <div className="box">测试</div>
      </CSSTransition>
    </div>
  );
};

export default AnimationExample;
