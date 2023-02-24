const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const devMode = !env.production;

    //by default if the mode is production webpack makes a separate css file 
    //const cssFromJS = devMode;
    const cssFromJS = true; 
    
    const cssLoaderRules = [
        cssFromJS ? "style-loader" : MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                url: {
                    filter: url => url.includes("img") ? false : true,
                }
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                  plugins: () => [
                    require('autoprefixer')
                  ]
                }
            }
        }        
    ];

    return {    
        entry: './src/index.js',
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            }),
            new CopyPlugin({
                patterns: [
                    { 
                        from: path.resolve(__dirname, "public/assets"), 
                        to: path.resolve(__dirname, "dist") 
                    },
                ],
            }),        
        ].concat(cssFromJS ? [] : [new MiniCssExtractPlugin()]),
        devServer: {
            static: path.resolve(__dirname, 'dist'),
            port: 8080,
            hot: true         
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [...cssLoaderRules]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [...cssLoaderRules, 'sass-loader']              
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(woff|woff2|ttf|otf)$/i,
                    type: 'asset/resource',
                },
            ],
        },
    }
}
