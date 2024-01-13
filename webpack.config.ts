import Webpack, { Configuration, ModuleOptions } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

type EnvVariables = {
  mode?: 'development' | 'production';
  port?: number;
};

function getPlugins({ mode }: EnvVariables): Configuration['plugins'] {
  const plugins: Configuration['plugins'] = [];
  const isDev = mode === 'development';

  if (isDev) {
    plugins.push(new ForkTsCheckerWebpackPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  } else {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }),
    );
  }

  plugins.push(
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html'),
    }),
  );

  return plugins;
}
function getRules({ mode }: EnvVariables): ModuleOptions['rules'] {
  const isDev = mode === 'development';

  const rules: ModuleOptions['rules'] = [];

  rules.push({
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]',
          },
        },
      },
      'sass-loader',
    ],
  });

  rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader',
      },
    ],
  });

  rules.push({
    test: /\.svg$/i,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'convertColors',
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  });

  return rules;
}

export default (options: EnvVariables) => {
  const { mode, port } = options;
  const isDev = mode !== 'production';

  const config: Webpack.Configuration & DevServerConfiguration = {
    entry: path.resolve(__dirname, './src/index.tsx'),
    mode: mode ?? 'development',
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    output: {
      path: path.resolve(__dirname, './build'),
      filename: 'bundle.[contenthash].js',
      clean: true,
    },
    devServer: isDev
      ? {
          port: port ?? 5000,
          open: true,
        }
      : undefined,
    devtool: isDev ? 'inline-source-map' : false,
    module: {
      rules: getRules(options),
    },
    plugins: getPlugins(options),
  };

  return config;
};
