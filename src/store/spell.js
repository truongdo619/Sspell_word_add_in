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
        resetFullList: false,
        is_word : function(word) {
            
            let upperCharacter = "ABCDEFGHIJKLMNOPQRSTUVWXYZÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬĐÈẺẼÉẸÊỀỂỄẾỆÌỈĨÍỊÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢÙỦŨÚỤƯỪỬỮỨỰỲỶỸÝỴ";
            for (let i=0; i<word.length; i++){
                if (upperCharacter.includes(word[i].toUpperCase())) {
                    return true
                }
            }
            return false
          }
    },
    mutations: {
        SET_CURRENT_PARA_LOADING(state, value){
            state.currentParaLoading = value;
        },
        SET_LOADING_ERROR_DONE(state, value){
            state.loadingErrorDone = value;
        },
        SET_STATE_OFFiCE(state, value){
            state.isOfficeInitialized = value;
        },
        SET_STATE_DICTIONARY(state){
            state.dictionary = JSON.parse(localStorage.getItem("dictionary"));
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
            localStorage.setItem("dictionary", JSON.stringify(state.dictionary));
        },
        SAVE_DICTIONARY(state, dictionary){
            state.dictionary = dictionary;
            localStorage.setItem("dictionary", JSON.stringify(state.dictionary));
        },
        UPDATE_RESET_FULL_LIST(state, value){
           if (value){
               state.loadErrorItems = false;
           }
            state.resetFullList = value
        }
    },
    actions: {
        save_dictionary({commit}, value){
            commit('SAVE_DICTIONARY', value)
        },
        update_reset_full_list({commit}, value){
            commit('UPDATE_RESET_FULL_LIST', value)
        },
        set_state_office({commit}, value){
            commit('SET_STATE_OFFiCE', value);
            commit('SET_STATE_DICTIONARY');
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
                let words = paragraph.split([" ", "-", ":", '"', "\xa0", ",", "(", ")", "[", "]", "{", "}", ".", "#", '@', '/', "'", '~', '`', '!', '$', '%', '^', '&', '*', '_', '+', '=', '|', '\\', ';', '<', '>'], true /* trimDelimiters*/, true /* trimSpaces */);
                words.load("text");
                paragraph.load("text")
                await context.sync()
                let pos = items[0]["wordPos"]
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
                let words = paragraph.split([" ", "-", ":", '"', "\xa0", ",", "(", ")", "[", "]", "{", "}", ".", "#", '@', '/', "'", '~', '`', '!', '$', '%', '^', '&', '*', '_', '+', '=', '|', '\\', ';', '<', '>'], true /* trimDelimiters*/, true /* trimSpaces */);
                words.load("text");
                paragraph.load("text")
                await context.sync();
                
                let pos = items[0]["wordPos"];
                // let word = items[0]["errorWord"]
                
                let words_new = [];
                for (let i=0; i< words.items.length; i++){
                    if (state.is_word(words.items[i].text)){
                        words_new.push((words.items[i]))
                    }
                }

                // for (let i=0; i< 20; i++){
                //     let text = words_new[pos - i].text.toLowerCase();
                    
                //     if (text === word)
                //     {      
                //         pos =  pos-i;
                //         break;
                //     }
                //     text = words_new[pos + i].text.toLowerCase();
                //     if (text === word)
                //     {      
                //         pos =  pos+i;
                //         break;
                //     }
                // }
                words_new[pos].select();
            });
        },

        async load_error_items_cur({commit}, settings){

            let content = null;
            let curIndex = 0;
            commit('SET_SATE_LOAD_CURRENT', false);
            console.log("-------------------------------------------------------")
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
                let data = await spell_check([{
                    "index": curIndex+1, 
                    "content": content
                }], settings);
                commit('LOAD_ERROR_ITEMS_CUR', { data : data["data"][0]["data"], index : curIndex+1});
            }
            commit('SET_SATE_LOAD_CURRENT', true);
        },
        async load_error_items_full({commit}, settings){
            let reset_list = false
            commit('SET_SATE_LOAD_FULL', false);
            
            commit('SET_LOADING_ERROR_DONE', false);
            await Word.run(async context => {
                let paragraphs = context.document.body.paragraphs;
                paragraphs.load("*");
                
                await context.sync();
            
                let p_count = 0;
                let q_count = 0;
                let p_params = [];
                let data = null;
                if (paragraphs != null){
                    for (let index = 0; index < paragraphs.items.length; index++) {
                        
                        commit('SET_CURRENT_PARA_LOADING', index+1);
                        let paragraph = paragraphs.items[index];
                        

                        if (paragraph.text.length > 10){
                            p_count += 1;
                            p_params.push({
                                "index": index+1, 
                                "content": paragraph.text
                            })
                        }
                        else
                        {
                            continue
                        }
                        
                        if ( p_count > 0 && p_count % 5 == 0){
                            data = await spell_check(p_params, settings);
                            p_params = [];

                            if (q_count === 0){
                                
                                commit('LOAD_ERROR_ITEMS_FULL', { data : data["data"][0]["data"], index : data["data"][0]["index"], isNew : true});

                                for (let i = 1; i < data["data"].length; i++){
                                    commit('LOAD_ERROR_ITEMS_FULL', { data : data["data"][i]["data"], index : data["data"][i]["index"], isNew : false});
                                }
                            }
                            else
                            {
                                for (let i = 0; i < data["data"].length; i++){
                                    commit('LOAD_ERROR_ITEMS_FULL', { data : data["data"][i]["data"], index : data["data"][i]["index"], isNew : false});
                                }
                            }
                            commit('SET_SATE_LOAD_FULL', true);
                            q_count += 1
                        }

                        // if (state.resetFullList){
                        //     reset_list = true
                        //     break
                        // }

                    }

                    if ( p_count > 0 && p_count % 5 != 0){
                        data = await spell_check(p_params, settings);
                        p_params = [];

                        if (q_count === 0){
                            
                            commit('LOAD_ERROR_ITEMS_FULL', { data : data["data"][0]["data"], index : data["data"][0]["index"], isNew : true});

                            for (let i = 1; i < data["data"].length; i++){
                                commit('LOAD_ERROR_ITEMS_FULL', { data : data["data"][i]["data"], index : data["data"][i]["index"], isNew : false});
                            }
                        }
                        else
                        {
                            for (let i = 0; i < data["data"].length; i++){
                                commit('LOAD_ERROR_ITEMS_FULL', { data : data["data"][i]["data"], index : data["data"][i]["index"], isNew : false});
                            }
                        }
                        q_count += 1
                        commit('SET_SATE_LOAD_FULL', true);
                    }

                    console.log(settings)
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