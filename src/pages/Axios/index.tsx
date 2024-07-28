import { Button, Flex } from 'antd';
import React from 'react';
import request from './request';
import { useImmer } from 'use-immer';
import Child1 from './Child1';
import Child2 from './Child2';

export default function Index() {
  const [todos, setTodos] = useImmer({
    list: [
      {
        id: 'React',
        title: 'Learn React',
      },
      {
        id: 'Immer',
        title: 'Try Immer',
      },
    ],
  });

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
      <Flex>
        <Button
          onClick={() => {
            setTodos((draft) => {
              draft.list.push({
                id: new Date().getTime().toString(),
                title: new Date().getTime().toString(),
              });
            });
          }}
        >
          +
        </Button>
        <Button
          onClick={() => {
            setTodos((draft) => {
              draft.list.shift();
            });
          }}
        >
          -
        </Button>
        <Button
          onClick={() => {
            // setTodos({
            //   list: [],
            // });
            setTodos((draft) => {
              draft.list = [];
            });
          }}
        >
          0
        </Button>
      </Flex>
      <hr />
      <Child1></Child1>
      <Child2 todos={todos}></Child2>
    </div>
  );
}
