

import { create } from "zustand";
import {persist} from "zustand/middleware"

const store = (set)=>({

})

export const storedata = create(persist(store,{name:"user-storage"}))