import Vue from 'vue'
import Vuex from 'vuex'
import {spellModule} from './spell'
import {searchModule} from './search'
import {templateModule} from './template'
import {mentionModule} from './mention'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        spell : spellModule,
        search : searchModule,
        template : templateModule,
        mention : mentionModule
    }
})