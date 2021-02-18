import axios from 'axios';

export default {
  GetMenu: async () => {
    let res = await axios.get(`/api/menus`);
    return res.data || [];
  }
}
