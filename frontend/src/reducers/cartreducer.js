import { createSlice } from '@reduxjs/toolkit';


export const cartSlice = createSlice({

  name: 'cart',
  initialState: {
    product: [],
    fav: []
  },
  reducers: {
    addtocart: (state, { payload }) => {
      const itemInCart = state.product.find((item) => item.id === payload.id);

      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.product.push({ ...payload, quantity: 1 });
      }
    },
    remove: (state, { payload }) => {
      const removeItem = state.product.filter((item) => item.id !== payload.id);
      state.product = removeItem;
    },
    incrementQuantity: (state, { payload }) => {
      const item = state.product.find((item) => item.id === payload.id);
      item.quantity++;

    },
    decrementQuantity: (state, { payload }) => {
      const item = state.product.find((item) => item.id === payload.id);
      if (item.quantity === 1) {
        item.quantity = 1
      } else {
        item.quantity--;
      }
    },
    gettotal: (state) => {

      let total = 0;

      state.product.forEach((item) => {

        total = total + item.quantity * item.price
      })

      state.total = total;
    },
    addtofav: (state,{payload}) => {
      let favitem = state.fav.find((item) => item.id === payload.id)
      if(favitem){
        alert('item already added to favoruites')
      }else{
         state.fav.push({...payload});
      }

    },
    remfav: (state,{payload}) =>{
      const remf = state.fav.filter((item) => item.id !== payload.id)
       state.fav = remf;
    }





  }
});

export const { addtocart, remove, incrementQuantity, decrementQuantity, gettotal,addtofav,remfav } = cartSlice.actions;

export default cartSlice.reducer





