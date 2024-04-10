import { defineApp } from 'umi';

console.log('app');

export default defineApp({
  render(oldRender) {
    console.log('==render====>');
    oldRender();
  },
  patchClientRoutes() {
    console.log('==patchClientRoutes====>');
  },
  onRouteChange(...args) {
    console.log('==onRouteChange====>', args);
  },
});
