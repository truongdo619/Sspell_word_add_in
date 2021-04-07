import {SPELL_API} from "../../config/config_api";
import axios from "axios";

const spell_check = async (content, settings) => {
  // console.log(content)
  try {
    const res = await axios.post(SPELL_API, {
        "content" : content,
        "field": settings.field,
        "speed": settings.speed
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