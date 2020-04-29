import merge from 'deepmerge';
import { createBasicConfig } from '@open-wc/building-rollup';
import html from '@open-wc/rollup-plugin-html';

const config = createBasicConfig();
export default merge(config, {
  output: { dir: 'dist' },
  plugins: [
    html({
      inputPath: 'index.html',
    }),
    html({
      inputPath: 'planner.html',
    }),
  ],
});
