import Vue from 'vue'
import Router from 'vue-router'
import CurSpell from '../views/spell/CurSpell'
import FullSpell from '../views/spell/FullSpell'
import HomeSpell from '../views/spell/Home'
import HomeSearch from '../views/search/Home'
import SearchDetail from '../views/search/Detail'
import SearchList from '../views/search/List'
import HomeMention from '../views/mention/Home'
import MentionList from '../views/mention/List'
import HomeTemplate from '../views/template/index'
import TemplateCreator from '../views/template_creator/index'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/spell/home',
            name: 'HomeSpell',
            component: HomeSpell
        },
        {
            path: '/spell/curlist',
            name: 'CurSpell',
            component: CurSpell
        },
        {
            path: '/spell/fulllist',
            name: 'FullSpell',
            component: FullSpell
        },
        {
            path: '/search/home',
            name: 'HomeSearch',
            component: HomeSearch
        },
        {
            path: '/search/list',
            name: 'SearchList',
            component: SearchList
        },
        {
            path: '/search/detail',
            name: 'SearchDetail',
            component: SearchDetail
        },
        {
            path: '/mention/home',
            name: 'HomeMention',
            component: HomeMention
        },
        {
            path: '/mention/list',
            name: 'MentionList',
            component: MentionList
        },
        {
            path: '/addin/template/home',
            name: 'HomeTemplate',
            component: HomeTemplate
        },
        {
            path: '/addin/template/creator',
            name: 'TemplateCreator',
            component: TemplateCreator
        }
    ]
})