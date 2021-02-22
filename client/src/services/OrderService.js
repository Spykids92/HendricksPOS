import axios from 'axios';

export default {
  CreateOrder: async (params) => {
      let res = await axios.post('/api/order',params);
      return res.data || [];
  },

  GetOrder: async () => {
    let res = await axios.get(`/api/orders`);
    return res.data || [];
  },

  UpdateOrder: async (orderId, params) => {
    let res = await axios.put('/api/order/'+orderId,params)
    return res.data || [];
  },

  DeleteOrder: async (orderId) => {
    let res = await axios.delete('/api/order/'+orderId);
    return res.data || [];
  }
}
