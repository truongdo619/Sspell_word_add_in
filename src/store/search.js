/* global Word */
import {search_by_title} from "../service/search_service/search_api"

const searchModule = {
    namespaced: true,
    state : { 
        loadingElement : true,
        activeElement : 0,
        listElement : [],
        Keyword : "",
        isNotFound : false
    },
    mutations: { 
        SET_SATE_ACTIVE(state, id){
            state.activeElement = id;
        },

        SET_SATE_LIST_ELEMENT(state, list){
            state.listElement = list;
            state.loadingElement = false;
        },
        SET_SATE_LOADING( state, value){
            state.loadingElement = value;
            state.isNotFound = false;
        },
        SET_SATE_KEY_WORD( state, value){
            state.Keyword = value;
        },
        SET_SATE_NOT_FOUND( state, value){
            state.isNotFound = value;
        }
           
    },
    actions: {
        set_state_active_element({commit}, id){
            commit("SET_SATE_ACTIVE", id);

        },
        async search_document({commit}, query){
            
            commit("SET_SATE_LOADING", true);
            let result = [];
            try{
                let data = await search_by_title({ "key" : query});
                result =  data['hits']['hits'];
                commit("SET_SATE_LIST_ELEMENT", result);
            }
            catch(err){
                console.log(err);
                
                commit("SET_SATE_LIST_ELEMENT", []);
            }
        },
        async search_document_by_selection({commit}){
            
            commit("SET_SATE_LOADING", true);

            let result = [];
            try{
                let paragraph = null;
                await Word.run(async context => {

                    paragraph = context.document.getSelection();
                    paragraph.load("text");
                    
                    await context.sync();
                });
                
                commit("SET_SATE_KEY_WORD", paragraph.text);
                let data = await search_by_title({ "key" : paragraph.text});
                result =  data['hits']['hits'];
                commit("SET_SATE_LIST_ELEMENT", result);
                
            }
            catch(err){
                console.log(err);
                commit("SET_SATE_LIST_ELEMENT", []);
                commit("SET_SATE_NOT_FOUND", true);
            }
        }
    }
    
}

export{
    searchModule
}