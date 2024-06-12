import React, { useEffect, useRef, useState } from 'react';
// import { Activity } from '@ivliu/react-offscreen';
import MyOffscreen from '@/components/MyOffscreen';
import { Button, Space } from 'antd';

// console.log('Activity' in React);
// console.log('unstable_Activity' in React);

const Counter = ({ i }) => {
  const [count, setCount] = useState(0);
  return (
    <h3 onClick={() => setCount(count + 1)} style={{ margin: '10px', border: '1px solid red' }}>
      {i}--{count}
    </h3>
  );
};

export default function Offscreen() {
  const [open, setOpen] = useState(0);
  const [list, setList] = useState(new Array(5).fill(9));

  const buttonRef = useRef(null);

  useEffect(() => {
    // import.meta.url 表示一个模块在浏览器和 Node.js 的绝对路径。该特性属于 es2020 的一部分
    console.log('import.meta', import.meta.url);

    const worker = new Worker(new URL('./wk.ts', import.meta.url));

    // set Worker Handle
    worker.onmessage = function (e: MessageEvent) {
      const result: string = e.data;
      console.log('收到了Worker线程的消息:', result);
    };

    // post Worker message
    worker.postMessage('hello from main thread');

    buttonRef.current?.addEventListener('click', () => {
      console.log('原始冒泡');
    });
    buttonRef.current?.addEventListener(
      'click',
      () => {
        console.log('原始捕获');
      },
      true,
    );
    return () => {
      buttonRef.current?.removeEventListener('click');
    };
  }, []);

  const onClick = () => {
    console.log('react冒泡');
  };

  const onClickCapture = () => {
    console.log('react捕获');
  };

  return (
    <div>
      <Button onClick={() => setOpen(99)}>99</Button>
      <br />

      <Space>
        {list.map((it, i) => (
          <Button key={i} onClick={() => setOpen(i)}>
            {i}
          </Button>
        ))}
      </Space>

      <hr />

      {list.map((it, i) => {
        return (
          <MyOffscreen key={i} mode={open === i ? 'visible' : 'hidden'}>
            <Counter i={i} />
          </MyOffscreen>
        );
      })}

      <hr />

      <div
        style={{
          height: '80px',
        }}
      >
        <svg width="100%" height="100%">
          <rect
            x="2"
            y="2"
            width="100%"
            height="100%"
            style={{
              width: `calc(100% - 4px)`,
              height: `calc(100% - 4px)`,
            }}
            rx="0"
            stroke="url(#paint0_linear_1_2)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="paint0_linear_1_2" x1="0" y1="0" x2="1" y2="0">
              <stop stopColor="#FFD75A" />
              <stop offset="1" stopColor="#ED424B" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <button onClick={onClick} onClickCapture={onClickCapture} ref={buttonRef}>
        开始
      </button>
    </div>
  );
}
