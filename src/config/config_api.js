const SEARCH_API = "https://spellapi.simidoc.vn";
const SPELL_API = "https://spellapi.simidoc.vn/api/spell/spellcheck";

// const SEARCH_API = "http://112.137.142.8:5000";
// const SPELL_API = "http://112.137.142.8:5005/api/spell/spellcheck";

const SEARCH_DOCUMENTS = {
  detail: SEARCH_API + '/api/lawtech_addin/document/',
  searchByCode: SEARCH_API + '/api/lawtech_addin/document/searchByCode',
  searchByContent: SEARCH_API + '/api/lawtech_addin/document/searchByContent',
  searchByTitle: SEARCH_API + '/api/lawtech_addin/document/searchByTitle',
  ner_search : SEARCH_API + '/api/lawtech_addin/document/NERsearch'
};


export {
  SEARCH_DOCUMENTS,
  SEARCH_API,
  SPELL_API
}