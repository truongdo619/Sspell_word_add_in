/* global Word */
import {spell_check} from '../service/spell_check_service/spell_api'

const spellModule = {
    namespaced: true,
    state : {
        isOfficeInitialized : false,
        errorItemsCur : [],
        loadErrorItemsCur : false,
        errorItems : [],
        loadErrorItems : false,
        totalErrorItems : 0,
        currentParaLoading: 1,
        loadingErrorDone: false,
        isCur : true,
        dictionary : [],
        resetFullList: false
    },
    mutations: {
        SET_CURRENT_PARA_LOADING(state, value){
            state.currentParaLoading = value;
        },
        SET_LOADING_ERROR_DONE(state, value){
            state.loadingErrorDone = value;
        },
        SET_SATE_OFFiCE(state, value){
            state.isOfficeInitialized = value;
        },
        UPDATE_ERROR_ITEMS_CUR(state, items){
            state.errorItemsCur = items;
        },
        UPDATE_ERROR_ITEMS(state, items){
            state.errorItems = items;
        },
        LOAD_ERROR_ITEMS_CUR(state, items){
            // for(let i = 0; i < 20; i++) {
            //     setTimeout(() => {
            //     }, i * 1000);
            // }
            state.errorItemsCur = [];
            let result = items.data.map(function(el, id) {
                var o = Object.assign({}, el);
                o.id = id + 1;
                o.paraId = items.index;
                return o;
              })
            state.errorItemsCur = result;
        },
        LOAD_ERROR_ITEMS_FULL(state, items){
            if (items.isNew === true){
                state.errorItems = [];
                state.totalErrorItems = 0;
            }
            let result = items.data.map(function(el) {
                var o = Object.assign({}, el);
                o.id = state.totalErrorItems++;
                o.paraId = items.index;
                return o;
              })
            state.errorItems = state.errorItems.concat(result);
        },
        SET_SATE_LOAD_CURRENT(state, value){
            state.loadErrorItemsCur = value;
            state.isCur = true;
        },
        SET_SATE_LOAD_FULL(state, value){
            state.loadErrorItems = value;
            state.isCur = false;
        },
        ADD_TO_DICTIONARY(state, word){
            state.dictionary.push(word);
        },
        UPDATE_RESET_FULL_LIST(state, value){
           if (value){
               state.loadErrorItems = false;
           }
            state.resetFullList = value
        }
    },
    actions: {
        update_reset_full_list({commit}, value){
            commit('UPDATE_RESET_FULL_LIST', value)
        },
        set_state_office({commit}, value){
            commit('SET_SATE_OFFiCE', value)
        },
        async select_current_btn({state}, data){
            let arr = []
            if (state.isCur == true){
                arr = state.errorItemsCur;
            }
            else{
                arr = state.errorItems;
            }
        
            let items = arr.filter((item) => {
                return item.id == data.id;
            });
            await Word.run(async context => {

                // Get paragraph selection
                let tmp = null;
                let paragraphs = context.document.body.paragraphs;
                paragraphs.load("text");
                await context.sync();
                tmp = paragraphs.items[items[0].paraId - 1];
                tmp.select();

                // Get word selection
                let paragraph = context.document.getSelection().paragraphs.getFirst();
                let words = paragraph.split([" ", "-", ":", '"', "\xa0", ",", "(", ")", "[", "]", "{", "}"], true /* trimDelimiters*/, true /* trimSpaces */);
                words.load("text");
                paragraph.load("text")
                await context.sync();
                let pos = items[0]["wordPos"];
                let word = items[0]["errorWord"]
                for (let i=0; i< 20; i++){
                    let text = words.items[pos - i].text.toLowerCase();
                    if (text === word)
                    {      
                        pos =  pos-i;
                        break;
                    }
                    text = words.items[pos + i].text.toLowerCase();
                    if (text === word)
                    {      
                        pos =  pos+i;
                        break;
                    }
                }
                words.items[pos].select();
                let doc = context.document;
                let originalRange = doc.getSelection();
                originalRange.insertText(items[0]["alternativeWord"][data.btnId], "Replace");
            });
            
            document.querySelector('div.el-collapse-item[errorId="' + data.id + '"]').style.display = "none";
        },
        async select_current_para({state}, data){
            let arr = []
            if (state.isCur === true){
                arr = state.errorItemsCur;
            }
            else{
                arr = state.errorItems;
            }
            let items = arr.filter((item) => {
                return item.id === data.id;
            })
            await Word.run(async context => {

                // Get paragraph selection
                let tmp = null;
                let paragraphs = context.document.body.paragraphs;
                paragraphs.load("text");
                await context.sync();
                tmp = paragraphs.items[items[0].paraId - 1];
                tmp.select();

                // Get word selection
                let paragraph = context.document.getSelection().paragraphs.getFirst();
                let words = paragraph.split([" ", "-", ":", '"', "\xa0", ",", "(", ")", "[", "]", "{", "}"], true /* trimDelimiters*/, true /* trimSpaces */);
                words.load("text");
                paragraph.load("text")
                await context.sync();
                let pos = items[0]["wordPos"];
                let word = items[0]["errorWord"]
                for (let i=0; i< 20; i++){
                    let text = words.items[pos - i].text.toLowerCase();
                    if (text === word)
                    {      
                        pos =  pos-i;
                        break;
                    }
                    text = words.items[pos + i].text.toLowerCase();
                    if (text === word)
                    {      
                        pos =  pos+i;
                        break;
                    }
                }
                words.items[pos].select();
                });
        },
        async load_error_items_cur({commit}, settings){
            let content = null;
            let curIndex = 0;
            commit('SET_SATE_LOAD_CURRENT', false);
            await Word.run(async context => {
                let paragraphs = context.document.body.paragraphs;
                paragraphs.load("text");
                let paragraph = context.document.getSelection().paragraphs.getFirst();
                paragraph.load("text");
                await context.sync();
                content = paragraph.text;
                for (let index = 0; index < paragraphs.items.length; index++) {
                    if (paragraphs.items[index].text ===  content){
                        curIndex = index;
                        break;
                    }
                }
                commit('SET_CURRENT_PARA_LOADING', curIndex + 1);
                paragraphs.items[curIndex].select();
            });

            if (content != null){
                let data = await spell_check(content, settings);
                commit('LOAD_ERROR_ITEMS_CUR', { data : data["data"], index : curIndex+1});
            }
            commit('SET_SATE_LOAD_CURRENT', true);
        },
        async load_error_items_full({commit, state}, settings){
            let reset_list = false
            commit('SET_SATE_LOAD_FULL', false);
            
            commit('SET_LOADING_ERROR_DONE', false);
            await Word.run(async context => {
                let paragraphs = context.document.body.paragraphs;
                paragraphs.load("text");
                await context.sync();

                if (paragraphs != null){
                    for (let index = 0; index < paragraphs.items.length; index++) {
                        
                        commit('SET_CURRENT_PARA_LOADING', index+1);
                        let paragraph = paragraphs.items[index];
                        let data = await spell_check(paragraph.text, settings);
                        if (state.resetFullList){
                            reset_list = true
                            break
                        }
                        if (index === 0){
                            commit('LOAD_ERROR_ITEMS_FULL', { data : data["data"], index : index+1, isNew : true});
                        }
                        else
                        {
                            commit('LOAD_ERROR_ITEMS_FULL', { data : data["data"], index : index+1, isNew: false});
                        }
                        commit('SET_SATE_LOAD_FULL', true);
                    }
                }
            }); 
            commit('SET_LOADING_ERROR_DONE', true);
            if (reset_list){
                commit('UPDATE_RESET_FULL_LIST', false)
            }
        },
        add_to_dictionary({commit}, word){
            commit('ADD_TO_DICTIONARY', word);
        }
    },
    getters : {
        isOfficeInitialized : state => state.isOfficeInitialized,
        errorItemsCur : state => state.errorItemsCur,
        errorItems : state => state.errorItems,
        loadErrorItems : state => state.loadErrorItems,
        totalErrorItems : state => state.totalErrorItems,
        currentParaLoading : state => state.currentParaLoading,
        loadingErrorDone : state => state.loadingErrorDone,
        isCur : state => state.isCur,
        dictionary : state => state.dictionary
    }
}

export{
    spellModule
}