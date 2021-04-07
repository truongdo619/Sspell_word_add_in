/* global Word */
import {template_list, template_detail} from '../service/template_service/template_api'

const templateModule = {
    namespaced: true,
    state : {
        template : '',
        template_list : [],
        is_loading_template : true,
        is_loading_detail : false
    },
    mutations: {
        LOAD_TEMPLATE(state, list){
            state.template_list = list;
            state.is_loading_template = false;
        },
        LOAD_DETAIL_TEMPLATE(state, content){
            state.is_loading_detail = content;
        }
    },
    actions: {
        async insert_template({commit}, id){
            commit("LOAD_DETAIL_TEMPLATE", true);
            try{
                let res = await template_detail(id);
                await Word.run(async context => {
                    let body = context.document.body;
                    body.insertHtml(res.data.data.html, "Replace")
                    await context.sync();
                });
            }
            catch(e){
                console.log(e);
            }
            
            
            commit("LOAD_DETAIL_TEMPLATE", false);
        },
        async load_template({commit}, data){
            try{
                    
                let res = await template_list(data.page, data.limit);
                commit("LOAD_TEMPLATE", res.data.data);
            }
            catch(e){
                commit("LOAD_TEMPLATE", []);
            }
        }
    },
    getters : {
        
    }
}

export{
    templateModule
}