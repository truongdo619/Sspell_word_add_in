import axios from "axios";

const template_list = async (page , limit) => {
    try {
        let res = await axios.get("https://lawtech.simidoc.vn/template/list", {
            params: {
                "limit" : limit,
                "page" : page
            }
          });
        return res;
      } catch (e) {
        console.log(e);
        return null;
      }
};

const template_detail = async (id) => {
    try {
        let res = await axios.get("https://lawtech.simidoc.vn/template/template", {
            params: {
                "template_id" : id
            }
          });
        return res;
      } catch (e) {
        console.log(e);
        return null;
      }
  };

export {
    template_list,
    template_detail
}