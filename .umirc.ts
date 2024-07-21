import { defineConfig } from 'umi';
import routes from './src/routers';

export default defineConfig({
  routes,
  npmClient: 'pnpm',
  metas: [
    { name: 'keywords', content: 'umi, umijs' },
    { name: 'description', content: 'React framework.' },
  ],
});
