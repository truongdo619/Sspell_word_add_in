/* global Word */
import {ner_search} from '../service/mention_service/mention_api'

const mentionModule = {
    namespaced: true,
    state : {
        template : '',
        mention_list : [],
        is_loading : true,
        is_not_found: false,
        activeElement : {
            "official_number": [
                "47/2019/QH14"
            ],
            "enforced_date": "2019-12-26T00:00:00",
            "expiry_date": null,
            "information_applicable": [],
            "the_reason_for_this_expiration": [],
            "the_reason_for_this_expiration_part": [],
            "document_info": [
                "Luật Tổ chức chính phủ và Luật Tổ chức chính quyền địa phương sửa đổi 2019",
                "Tình trạng: Đã biết"
            ],
            "gazette_date": null,
            "issued_date": "2019-11-22T00:00:00",
            "effective_date": null,
            "effective_area": "",
            "collection_source": [],
            "document_field": [
                "Bộ máy hành chính"
            ],
            "document_department": [],
            "issuing_body/office/signer": [
                "Quốc hội",
                "",
                "Nguyễn Thị Kim Ngân"
            ],
            "document_type": [
                "Luật"
            ]
        },
        active_names : []
    },
    mutations: {
        SET_SATE_ACTIVE(state, element){
            state.activeElement = element;
        },
        SET_SATE_ACTIVE_NAMES(state, active_names){
            state.active_names = active_names;
        },
        LOAD_TEMPLATE(state, list){
            state.mention_list = [];
            for ( let i =0; i< list.length; i++){
                if (list[i].detailed.length !== 0){
                    state.mention_list.push(list[i])
                }
            }
            state.is_not_found = state.mention_list.length <= 0;
            state.is_loading = false;
        },
        RESET_LOADING(state){
            state.is_loading = true;
        }
    },
    actions: {
        set_state_active_element({commit}, active_names){
            commit("SET_SATE_ACTIVE", active_names);
        },
        set_state_active_names({commit}, element){
            commit("SET_SATE_ACTIVE_NAMES", element);
        },
        async load_mention({commit}){
            commit("RESET_LOADING");
            try{
                await Word.run(async context => {
                    let body = context.document.body;
                    body.load("text");
                    await context.sync();
                    let data = await ner_search(body.text);
                    commit("LOAD_TEMPLATE", data.data.found);
                });

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
    mentionModule
}