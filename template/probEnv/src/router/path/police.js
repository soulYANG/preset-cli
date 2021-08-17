const police = resolve => require(['@/view/police/index'], resolve);
const settings = resolve => require(['@/components/police/settings.vue'], resolve);
const methods = resolve => require(['@/components/police/components/SettingsTabs/MethodsTab.vue'], resolve);
const address = resolve => require(['@/components/police/components/SettingsTabs/AddressTab.vue'], resolve);
const time = resolve => require(['@/components/police/components/SettingsTabs/TimeTab.vue'], resolve);
const description = resolve => require(['@/components/police/components/SettingsTabs/DescriptionTab.vue'], resolve);


export default [
    {
        path: '/police',
        name: 'police',
        component: police,
        meta: {
            title: "锋刃 警情研判"
        },

    },
    {
        path:'/settings',
        redirect:'/settings/methods',
        component:settings,
        children:[
            {
                path:'methods',
                component:methods,
                meta:{
                    activekey:0
                }
            },
            {
                path:'address',
                component:address,
                meta:{
                    activekey:1
                }
            },
            {
                path:'time',
                component:time,
                meta:{
                    activekey:2
                }
            },
            {
                path:'description',
                component:description,
                meta:{
                    activekey:3
                }
            }
        ]
    }
]