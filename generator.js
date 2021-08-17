module.exports = (api, options, rootOptions) => {
    api.extendPackage({
        author: options.problem2,
        script: {
            test: 'vue-cli-servuce command'
        }
    })
    // 复制并用ejs渲染template内的文件
    // 判断用户的选择 渲染对应的模版
    api.render(`./template/${options.problem1}`)
    // 3.修改 `package.json` 里的字段
    api.extendPackage({
        // 4.添加第三库的依赖
        dependencies: {
            "@antv/data-set": "^0.11.4",
            "@antv/g2": "^4.0.10",
            "axios": "^0.19.0",
            "echarts": "^5.1.2",
            "element-ui": "^2.13.2",
            "swiper": "^5.4.2",
        },
        // 4.添加第三库的依赖
        devDependencies: {
            // 'normalize.css': '^8.0.1'
        },
        // 5.添加自定义的脚本
        scripts: {
            "serve": "vue-cli-service serve --mode dev",
            "build.test": "vue-cli-service build --mode test",
            "build.gray": "vue-cli-service build --mode gray",
            "build.prod": "vue-cli-service build --mode prod",
            "lint": "vue-cli-service lint"
        },
        config: {}
    })
}

