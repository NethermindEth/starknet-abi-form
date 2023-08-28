import type { StorybookConfig } from '@storybook/react-webpack5';

function removeSvg(rules) {
  return rules.map(({ test, ...rest }) => ({
    test: RegExp(test.source.replace('svg|', '')),
    ...rest,
  }));
}

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-styling',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  // webpackFinal: async (config) => {
  //   if (config?.module?.rules) {
  //     config.module.rules = removeSvg(config.module.rules);
  //     config?.module?.rules?.push({
  //       test: /\.svg$/,
  //       use: ['@svgr/webpack', 'url-loader'],
  //     });
  //   }
  //   return config;
  // },
};
export default config;
