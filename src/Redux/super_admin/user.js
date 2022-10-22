import api from "../../Utils/api"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import Cookies from "universal-cookie"

const cookies  = new Cookies()


//super-admin post request to add admins
export const postAddAdmin = createAsyncThunk(
    "userSlice/postAddAdmin",
    async function (adminData,{rejectWithValue,dispatch}){
        try {
            let response = await api.post(`/api/system-user`,adminData)
            if (response.status === 200 || response.status === 201){
            }
            if(!response.status){
                throw new Error("Internal Server Error")
            }
            return {}
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }        
    }
)


//super-admin get all admins
export const getAllAdmin = createAsyncThunk(
    "userSlice/getAllAdmin",
    async function (adminData,{rejectWithValue,dispatch}){
        try {
            let response = await api.get(`/api/system-user/all`)
            if (response.status === 200 || response.status === 201){
                 dispatch(setAdminDatas(response.data))
            }
            if(!response.status){
                throw new Error("Internal Server Error")
            }
            return 
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }        
    }
)


//super-admin delete request to delete admins
export const deleteAdmin = createAsyncThunk(
    "userSlice/deleteAdmin",
    async function (admin_id,{rejectWithValue,dispatch}){
        try {
            let response = await api.delete(`/api/system-user/?userId=${admin_id}`)
            if (response.status === 200 || response.status === 201){
            }
            if(!response.status){
                throw new Error("Internal Server Error")
            }
            return {}
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message)
        }        
    }
)

//super-admin block admins right
export const blockAdmin = createAsyncThunk(
    "userSlice/blockAdmin",
    async function (admin_data,{rejectWithValue,dispatch}){
        try {
            let response = await api.put(`/api/system-user/update-activeness`,admin_data)
            if (response.status === 200 || response.status === 201){
            }
            if(!response.status){
                throw new Error("Internal Server Error")
            }
            return {}
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message)
        }        
    }
)



export const users = createSlice({
    name:"userSlice",
    initialState:{
        phone_number:null,
        password:null,
        status:null,
        error:null,
        role:cookies.get("role")??null,

        adminDatas:{
         data:[],   
         status:null,
         error:null
        }
    },
    reducers:{
        logoutUser:(state,action)=>{
            state.role = null
            state.phone_number = null
            state.password = null
            state.status = null
            state.error = null
            cookies.remove("role")
            cookies.remove("access")
        },
        setAdminDatas:(state,action)=>{
            state.adminDatas.data = action.payload
        }
    },
    extraReducers:{
         [postAddAdmin.pending]:(state)=>{
             state.status = 'pending'
             state.error = null
         },
        [postAddAdmin.fulfilled]:(state,action)=>{
             state.status = "resolved"
             state.phone_number = action.payload.phone_number
             state.password = action.payload.password
             state.role = action.payload.role
        }, 
        [postAddAdmin.rejected]:(state,action)=>{
            state.status = "rejected";
            state.error = action.payload;
        },
        [getAllAdmin.pending]:(state)=>{
            state.adminDatas.status = 'pending'
            state.error = null
        },
       [getAllAdmin.fulfilled]:(state,action)=>{
            state.status = "resolved"
       }, 
       [getAllAdmin.rejected]:(state,action)=>{
           state.status = "rejected";
           state.error = action.payload;
       }
    }
})

export const {logoutUser,setAdminDatas}  =  users.actions

export default users.reducer