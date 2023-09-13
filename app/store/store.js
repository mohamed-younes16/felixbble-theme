

import { create } from "zustand";
import {persist} from "zustand/middleware"

const store = (set)=>({
    shown:true,
setshown:()=>set(s=>({shown:!s.shown})),
toggleshown:(v)=>set(s=>({shown:v})),
selected:0,
setselected:v=> set((s)=> ({selected:v})),
total:0,

choosed:1,
setChoosed: p => set(s=>{

    if ( s.choosed > 1 && p == "minus") return { choosed : s.choosed - 1}
    else if (p == "plus"  )  return { choosed : s.choosed + 1}
    if ( s.choosed  == 1 && p == "minus") return {choosed:1}
}),
cart:[],
setCart: (v, q) => set(s => {
    const check = s.cart?.findIndex(e => e._id === v._id);

    try {
        if (check === -1) {
            s.cart.push({
                _id: v._id,
                name: v.name,
                quantity: s.choosed,
                image: v.image[0],
                price: v.price
            });
        } else {
            let newCart = [...s.cart];
            newCart[check].quantity += q;
            s.cart = newCart; // Update the cart directly

        }

        let subtotal = 0;
        s.cart.forEach(e => {
            subtotal += e.price * e.quantity;
        });
        
        return {
            choosed: 1,
            total: subtotal // Update the total here
        };
    } catch (error) {
        
    }
})

,
setcartmenu:(id,op)=>set((s)=>{
    const index = s.cart.findIndex(e=>e._id == id)
    let newCart = [...s.cart];
    let subtotal = 0;
        s.cart.forEach(e => {
            subtotal += e.price * e.quantity;
        });
    if ( s.cart[index].quantity > 1 && op == "dec"){ 
        newCart[index].quantity -= 1
    
    }
    else if (op == "inc"  ) { 
        newCart[index].quantity += 1

    }
    else if (op === "dec" && s.cart[index].quantity === 1) {
        return null; 
    }
    return {
        total:subtotal,
        cart:newCart
    }
}),
deletecartitem:(id)=>set(s=>{
    const filtered = s.cart.filter(e=>e._id !== id)

    let subtotal = 0;
    filtered.forEach(e => {
        subtotal += e.price * e.quantity;
    });

   
    return { cart : filtered, total: subtotal}
})

})

export const storedata = create(persist(store,{name:"user-storage"}))