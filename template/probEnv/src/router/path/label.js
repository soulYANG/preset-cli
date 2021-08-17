const label_index = resolve => require(['@/view/label/index'], resolve);
export default [
    {
        path: '/label_index',
        name: 'label_index',
        component: label_index,
        meta: {
            title: "锋刃 标签体系"
        }
    }
]