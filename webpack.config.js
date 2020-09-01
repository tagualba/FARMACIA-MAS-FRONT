const htmlWebPackPlugin = require('html-webpack-plugin')
module.exports={
    entry: './src/public/js/Catalogo.js',
    output:{
        path: __dirname + '/build',
        filename:'bundle.js'
    },
    plugins:[
        new htmlWebPackPlugin({
            template:'./src/loquesea'
        })
    ]


}