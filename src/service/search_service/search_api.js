import {SEARCH_DOCUMENTS} from "../../config/config_api";
import axios from "axios";

const get_detail = async (law_id) => {
  try {
    let res = await axios.get(SEARCH_DOCUMENTS.detail + law_id);
    return res.data
  } catch (e) {
    console.log(e);
    return null
  }
};

const search_by_title = async (queryParams) => {
  try {
    if (queryParams['key'] !== undefined) {
      const {data} = await axios.post(SEARCH_DOCUMENTS.searchByTitle, {
        title: queryParams['key'],
        size: '5',
        time_range: queryParams['time_range'],
        match_phrase: false,
        doc_status: queryParams['doc_status'],
        document_types_condition: queryParams['document_types_condition'],
        issuing_body: queryParams['issuing_body'],
        sorted_by: queryParams['sorted_by'],
        document_field: queryParams['document_field'],
        from: queryParams['from'],
      });
      return data;
    }
    else {
      return null;
    }
  } catch (e) {
    console.log(e);
    return null
  }
};

const search_by_code = async (queryParams) => {
  try {
    const { data } = await axios.post(SEARCH_DOCUMENTS.searchByCode, {
      code: queryParams['key'],
      size: '5',
      time_range: queryParams['time_range'],
      match_phrase: false,
      doc_status: queryParams['doc_status'],
      document_types_condition: queryParams['document_types_condition'],
      issuing_body: queryParams['issuing_body'],
      sorted_by: queryParams['sorted_by'],
      from: queryParams['from']
    });
    return data;
  } catch (e) {
    console.log(e);
    return null
  }
};

const search_by_content = async (queryParams) => {
  try {
    const { data }  = await axios.post(SEARCH_DOCUMENTS.searchByContent, {
      content: queryParams['key'],
      size: '5',
      time_range: queryParams['time_range'],
      match_phrase: true,
      doc_status: queryParams['doc_status'],
      document_types_condition: queryParams['document_types_condition'],
      issuing_body: queryParams['issuing_body'],
      sorted_by: queryParams['sorted_by'],
      from: queryParams['from']
    });
    return data;
  } catch (e) {
    console.log(e);
    return null
  }
};

export {
  get_detail,
  search_by_code,
  search_by_content,
  search_by_title,
}