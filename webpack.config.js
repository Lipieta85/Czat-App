const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const environment = env = process.env.NODE_ENV || 'development'

const plugins = [new HtmlWebpackPlugin({
    template: 'client/index.html',
    filename: 'index.html',
    inject: 'body'
}),
new OptimizeJsPlugin({
    sourceMap: false
})
];

if (env === 'production') {
    plugins.push(
        new OptimizeJsPlugin({
            sourceMap: false
        })
    )
}

//webpack.config.js
module.exports = {

    mode: environment,
    entry: './client/index.js',
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'app.bundle.js'
    },

    devServer: {
        proxy: {
            '/socket.io': {
                target: 'http://localhost:3000',
                ws: true
            }
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                options: {
                    plugins: env !== 'production' ? ["react-hot-loader/babel"] : []
                }
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]

    },
    plugins: plugins
};