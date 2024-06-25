import { Button } from 'antd';
import React from 'react';
import request from './request';

export default function index() {
  return (
    <div>
      index
      <Button
        onClick={() => {
          request
            .get('http://0.0.0.0:3000/')
            .then((res) => {
              console.log('res', res);
            })
            .catch((err) => {
              console.log('==点击====>', err);
            });
        }}
      >
        测试
      </Button>
    </div>
  );
}
