import {SPELL_API} from "../../config/config_api";
import axios from "axios";

const spell_check = async (payload, settings) => {
  console.log(settings)
  try {
    const res = await axios.post(SPELL_API, {
        "paragraphs" : payload
    })

    // console.log(res)
    return res
  } catch (e) {
    console.log(e);
    return null
  }
};

export {
    spell_check
}