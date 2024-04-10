import { defineConfig } from 'umi';
import routes from './src/routers';

export default defineConfig({
  routes,
  npmClient: 'pnpm',
});
