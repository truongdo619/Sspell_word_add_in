import axios from "axios";
import {SEARCH_DOCUMENTS} from "../../config/config_api";


const ner_search = async (content , minimum_should_match = "80") => {
    try {
        let res = await axios.post(SEARCH_DOCUMENTS.ner_search,
            {
                "doc_text" : content,
                "minimum_should_match" : minimum_should_match
            }
        );
        return res;
    } catch (e) {
        console.log(e);
        return null;
    }
};


export {
    ner_search
}