import { ScullyConfig } from '@scullyio/scully';
const { MinifyHtml } = require('scully-plugin-minify-html');

const postRenderers = [MinifyHtml];

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'scully-cloudflare',
  outDir: './dist/static',
  appPort: 5855,
  staticPort: 5856,
  proxyConfig: 'src/proxy.config.json',
  routes: {
    '/users/:userId': {
      type: 'json',
      userId: {
        url: 'http://localhost:8200/users',
        resultsHandler: (raw) => raw.filter((row) => row.id <= 10),
        property: 'id',
        postRenderers: postRenderers, // per route config
      },
    },
  },
  puppeteerLaunchOptions: {
    args: [
      '--disable-gpu',
      '--renderer',
      '--no-sandbox',
      '--no-service-autorun',
      '--no-experiments',
      '--no-default-browser-check',
      '--disable-dev-shm-usage',
      '--disable-setuid-sandbox',
      '--no-first-run',
      '--no-zygote',
      '--single-process',
      '--disable-extensions',
    ],
  },
};
