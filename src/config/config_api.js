// const SEARCH_API = "https://spellapi.simidoc.vn";
// const SPELL_API = "https://spellapi.simidoc.vn/api/spell/spellcheck";

const SEARCH_API = "https://sspell.forgetit.xyz";
const SPELL_API = "https://sspell.forgetit.xyz/api/spell/spellcheck";

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