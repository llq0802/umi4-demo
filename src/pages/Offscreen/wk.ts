self.onmessage = function (e: MessageEvent) {
  console.log('收到了主线程的消息', e.data);
  const result = [{ name: 'llq', age: 18 }];
  self.postMessage(result);
};
