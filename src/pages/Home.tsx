import { useRef, useState } from 'react';
import styles from './Home.less';
import classnames from 'classnames';
import { message } from 'antd';

// const list = [
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
// ];

// const matrix = (rows, cols) => new Array(cols).fill(0).map((o, i) => new Array(rows).fill(0));
// const list = matrix(3, 3);
// export default function HomePage() {
//   const handleClick = (e, row, col) => {
//     console.log('handleClick', row, col);
//   };

//   return (
//     <div className={styles.container}>
//       {list.map((items, rowIndex) => {
//         return items?.map((item, colIndex) => {
//           return (
//             <div
//               // data-mark-index={}
//               className={classnames(styles.item)}
//               key={rowIndex + colIndex}
//               onClick={(e) => handleClick(e, rowIndex, colIndex)}
//             >
//               {rowIndex}-{colIndex}
//             </div>
//           );
//         });
//       })}
//     </div>
//   );
// }

const findSubStr = (str1: string, str2) => {
  if (str1.length > str2.length) {
    [str1, str2] = [str2, str1];
  }
  let result = '';
  const len = str1.length;

  for (let j = len - 1; j > 0; j--) {
    for (let i = 0; i < len - j; i++) {
      result = str1.substr(i, j);
      if (str2.includes(result)) return result;
    }
  }

  // for (let i = 0; i < len; i++) {
  //   for (let j = i + 1; j < len + 1; j++) {
  //     result = str1.slice(i, i + j);
  //     console.log('result', result);
  //     if (str2.includes(result)) {
  //       return result;
  //     }
  //   }
  // }
};

console.log('===', findSubStr('aabbcc11a', 'ppooiiuubcc123')); // bcc1

const defaultList = new Array(9).fill({ isShow: false });
const adjoinMap = {
  0: [0, 1, 3],
  1: [0, 1, 2, 4],
  2: [1, 2, 5],
  3: [0, 3, 4, 6],
  4: [1, 3, 4, 5, 7],
  5: [4, 5, 2, 8],
  6: [6, 3, 7],
  7: [6, 8, 7, 4],
  8: [8, 7, 5],
} as const;

export default function Home() {
  const [list, setList] = useState<{ isShow: boolean }[]>(defaultList);
  const flag = useRef(false);

  const handleClick = (i: number) => {
    if (flag.current) return;
    const activeList = (adjoinMap as unknown as Record<string, number[]>)[i];
    const newList = JSON.parse(JSON.stringify(list));
    activeList.forEach((item) => {
      const val = newList[item];
      val.isShow = !val.isShow;
    });
    setList(newList);
    if (newList.every((item: { isShow: boolean }) => item.isShow)) {
      flag.current = true;
      setTimeout(() => {
        message.success('完成游戏!');
      }, 200);
    }
  };

  return (
    <>
      <div className={styles.container}>
        {list.map((item, index) => {
          return (
            <div
              key={index}
              className={classnames([styles.item, item.isShow ? styles.clear : ''])}
              onClick={() => handleClick(index)}
            >
              {index + 1}
            </div>
          );
        })}
      </div>

      <div>
        <button
          onClick={() => {
            setList(defaultList);
            flag.current = false;
          }}
        >
          重置
        </button>
      </div>
    </>
  );
}
