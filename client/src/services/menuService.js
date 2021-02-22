import axios from 'axios';

export default {
  CreateMenu: async (params) => {
      let res = await axios.post('/api/menu',params);
      return res.data || [];
  },

  GetMenu: async () => {
    let res = await axios.get(`/api/menus`);
    return res.data || [];
  },

  UpdateMenu: async (menuId, params) => {    
    let res = await axios.put('/api/menu/'+menuId,params)
    return res.data || [];
  },

  DeleteMenu: async (menuId) => {
    let res = await axios.delete('/api/menu/'+menuId);
    return res.data || [];
  }
}
