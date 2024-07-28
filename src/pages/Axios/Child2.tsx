import React from 'react';

const Child1 = ({ todos }) => {
  console.log('== Child2 ====>');
  return (
    <div>
      Child1
      <hr />
      {todos?.list.map((item) => {
        return <div key={item.id}>{item.title}</div>;
      })}
    </div>
  );
};

export default Child1;
