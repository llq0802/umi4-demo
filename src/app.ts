import { defineApp } from 'umi';

console.log('app start');

export default defineApp({
  render(oldRender) {
    console.log('==render====>');
    oldRender();
  },
  patchClientRoutes() {
    console.log('==patchClientRoutes====>');
  },
  onRouteChange(...args) {
    console.log('==onRouteChange====>');
  },
});
