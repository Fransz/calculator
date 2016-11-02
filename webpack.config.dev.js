var path = require('path')


const DEBUG = !process.argv.includes('--release')
const VERBOSE = process.argv.includes('--verbose')
const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1'
]

const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    __DEV__: DEBUG
}


module.exports = {
    entry: './src/index.js',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },

    plugins: [ 
    ],

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, './src')
                ],
                exclude: /node_modules/,
                query: {
                    babelrc: false,
                    presets: [
                        'react',
                        'es2015',
                        'stage-0'
                    ],
                    plugins: [
                        'transform-runtime',
                        'transform-react-remove-prop-types',
                        'transform-react-constant-elements',
                        'transform-react-inline-elements'
                    ]
                }
            },
            { 
                test: /\.css$/, 
                loaders: [
                    'isomorphic-style-loader',
                    `css-loader?${JSON.stringify(
                        {
                            importLoaders: 1, sourceMap: true, modules: true,
                            localIdentName: '[name]-[local]-[hash:base64:5]', minimize: false
                        }
                    )}`,
                    'postcss-loader?pack=default'
                ]
            }
        ]
    },

    postcss(bundler) {
        return {
            default: [
                // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
                // https://github.com/postcss/postcss-import
                require('postcss-import')({ addDependencyTo: bundler }),
                // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
                // https://github.com/postcss/postcss-custom-properties
                require('postcss-custom-properties')(),
                // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
                // https://github.com/postcss/postcss-custom-media
                require('postcss-custom-media')(),
                // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
                // https://github.com/postcss/postcss-media-minmax
                require('postcss-media-minmax')(),
                // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
                // https://github.com/postcss/postcss-custom-selectors
                require('postcss-custom-selectors')(),
                // W3C calc() function, e.g. div { height: calc(100px - 2em); }
                // https://github.com/postcss/postcss-calc
                require('postcss-calc')(),
                // Allows you to nest one style rule inside another
                // https://github.com/jonathantneal/postcss-nesting
                require('postcss-nesting')(),
                // W3C color() function, e.g. div { background: color(red alpha(90%)); }
                // https://github.com/postcss/postcss-color-function
                require('postcss-color-function')(),
                // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
                // https://github.com/iamvdo/pleeease-filters
                require('pleeease-filters')(),
                // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
                // https://github.com/robwierzbowski/node-pixrem
                require('pixrem')(),
                // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
                // https://github.com/postcss/postcss-selector-matches
                require('postcss-selector-matches')(),
                // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
                // https://github.com/postcss/postcss-selector-not
                require('postcss-selector-not')(),
                // Postcss flexbox bug fixer
                // https://github.com/luisrudge/postcss-flexbugs-fixes
                require('postcss-flexbugs-fixes')(),
                // Add vendor prefixes to CSS rules using values from caniuse.com
                // https://github.com/postcss/autoprefixer
                require('autoprefixer')({ browsers: AUTOPREFIXER_BROWSERS })
            ]
        }
    }
}
