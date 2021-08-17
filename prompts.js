// Inquirer.js 的 问题 的数组
module.exports = [
    {
        type: 'list',
        name: 'problem1',
        message: '请选择模版?',
        choices: [
            {name: '模版1', value: 'template1-demo'},
            {name: '模版2', value: 'template2-demo'}
        ],
        default: 'template1'
    },
    {
        type: 'input',
        name: 'problem2',
        message: '请输入你的姓名',
        default: 'null'
    }
]
