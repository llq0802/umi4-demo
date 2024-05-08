import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import Mock from 'better-mock';
import { usePrevious, useUpdateLayoutEffect } from 'ahooks';

const About = () => {
  const [open, setOpen] = useState(false);
  const [list, setList] = useState(
    Mock.mock({ 'list|5': [{ id: '@id', 'age|1-99': 20, name: '@cname' }] }).list,
  );
  return (
    <div>
      <h1>About</h1>
      <Button onClick={() => setOpen(!open)}>点击切换key</Button>
      <Button
        onClick={() =>
          setList(
            Mock.mock({
              'list|5': [
                {
                  id: '@id',
                  'age|1-99': 20,
                  name: '@cname',
                },
              ],
            }).list,
          )
        }
      >
        点击List
      </Button>
      <hr />
      <br />
      <br />
      <hr />
      <Profile key={open + ''} list={list} />
    </div>
  );
};

function Profile({ list }) {
  // ✅ 当 key 变化时，该组件内的 comment 或其他 state 会自动被重置
  const [comment, setComment] = useState(0);
  const [innerList, setInnerList] = useState(list);
  // const prevList = usePrevious(list);

  useEffect(() => {
    console.log('useEffect-Profile');
  }, []);

  // if (!Object.is(list, innerList)) {
  //   console.log('两次不一样');
  //   setInnerList(list);
  // }

  useUpdateLayoutEffect(() => {
    setInnerList(list);
  }, [list]);

  return (
    <div>
      <h3>Profile-{comment}</h3>
      <Button onClick={() => setComment(comment + 1)}>点击</Button>
      <Button
        onClick={() =>
          setInnerList(
            Mock.mock({
              'list|5': [
                {
                  id: '@id',
                  'age|1-99': 20,
                  name: '@cname',
                },
              ],
            }).list,
          )
        }
      >
        点击2
      </Button>
      <hr />
      {innerList?.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
}
export default About;
