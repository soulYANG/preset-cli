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
}

