import React from 'react';
import { motion } from 'framer-motion';

const FramerMotion = () => {
  return (
    <motion.div
      onClick={() => {
        console.log('== ====>');
      }}
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'red',
        borderRadius: '4px',
        margin: `100px auto`,
      }}
      // 以下三个属性
      // 是motion组件提供的能力

      // 实现鼠标悬浮的效果
      whileHover={{
        rotate: 45,
        scale: 1.2,
        opacity: 0.5, // 不透明度设置为0.5
        borderRadius: 40,
      }}
      // 让元素可以随意拖拽
      drag
      // 元素放手后会自动回到起始点
      dragSnapToOrigin
    ></motion.div>
  );
};

export default FramerMotion;
