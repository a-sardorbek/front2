import api from "../../Utils/api"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"

//super-admin  and admin gets all infos
export const getInfos = createAsyncThunk(
    "infos_slice/getInfos",
    async function (currentPage,{rejectWithValue,dispatch}){
        try {
            let response = await api.get(`/api/client/all-pageable?pageNum=0&pageSize=${currentPage}`)
            if (response.status === 200 || response.status === 201){
                 dispatch(setInfos(response.data))
            }
            if(!response.status){
                throw new Error("Internal Server Error")
            }
            return 
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message)
        }        
    }
)


//super-admin and admin gets single info
export const getSingleInfo = createAsyncThunk(
    "infos_slice/getSingleInfo",
    async function (clientId,{rejectWithValue,dispatch}){
        try {
            let response = await api.get(`api/client?clientId=${clientId}`)
            if (response.status === 200 || response.status === 201){
                 dispatch(setSingleInfo(response.data))
            }
            if(!response.status){
                throw new Error("Internal Server Error")
            }
            return 
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message)
        }        
    }
)

//super-admin and admin edit single info
export const editSingleInfo = createAsyncThunk(
    "infos_slice/editSingleInfo",
    async function (data,{rejectWithValue,dispatch}){
        try {
            let response = await api.put(`api/client/update`,data)
            if (response.status === 200 || response.status === 201){
            }
            if(!response.status){
                throw new Error("Internal Server Error")
            }
            return 
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message)
        }        
    }
)

// update Status
export const editStatus = createAsyncThunk(
    "infos_slice/editStatus",
    async function (data,{rejectWithValue,dispatch}){
        try {
            let response = await api.put(`api/client/updateStatus`,data)
            if (response.status === 200 || response.status === 201){
            }
            if(!response.status){
                throw new Error("Internal Server Error")
            }
            return 
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message)
        }        
    }
)





// filter for infos
export const filteredInfo = createAsyncThunk(
    "infos_slice/filteredInfo",
    async function (data,{rejectWithValue,dispatch}){
        try {
            let response = await api.get(`/api/client/filter?houseNum=${data.houseNum}&flatNum=${data.flatNum}&regionId=${data.regionId}&name=${data.name}`)
            if (response.status === 200 || response.status === 201){
                dispatch(setFilteredInfos(response.data))
            }
            if(!response.status){
                throw new Error("Internal Server Error")
            }
            return 
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message)
        }        
    }
)


//super-admin  and admin post all infos
export const postInfo = createAsyncThunk(
    "infos_slice/postInfo",
    async function (data,{rejectWithValue,dispatch}){
        try {
            let response = await api.post(`/api/client`,data)
            if (response.status === 200 || response.status === 201){
            }
            if(!response.status){
                throw new Error("Internal Server Error")
            }
            return 
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message)
        }        
    }
)

//super-admin and admin delete  created infos
export const deleteInfo = createAsyncThunk(
    "infos_slice/deleteInfo",
    async function ({userId,clientId},{rejectWithValue,dispatch}){
        try {
            let response = await api.delete(`/api/client/delete?clientId=${clientId}&userId=${userId}`)
            if (response.status === 200 || response.status === 201){
                 
            }
            if(!response.status){
                throw new Error("Internal Server Error")
            }
            return 
        } catch (error) {
            return rejectWithValue(error.response.data.message || error.message)
        }        
    }
)


export const infos = createSlice({
    name:"infos_slice",
    initialState:{
       infos:{
         data:[],
         status:null,
         error:null
       },
       singleInfo:{
         data:{},
         status:null,
         error:null
       },
       deletedInfos:{
        status:null,
        error:null
      },
      addInfo:{
        status:null,
        error:null
      },
      editInfo:{
        status:null,
        error:null
      },
      filterInfo:{
        status:null,
        error:null
      }
    },
    reducers:{
        setInfos:(state,action)=>{
            state.infos.data = action.payload
        },
        setSingleInfo:(state,action)=>{
            state.singleInfo.data = action.payload
        },
        clearSingleInfo:(state,action)=>{
            state.singleInfo.data = {}
        },
        setFilteredInfos:(state, action)=>{
            state.filterInfo.data = action.payload
        }
    },
    extraReducers:{
        [getInfos.pending]:(state)=>{
            state.infos.status = 'pending'
            state.infos.error = null
        },
       [getInfos.fulfilled]:(state,action)=>{
            state.infos.status = "resolved"
       }, 
       [getInfos.rejected]:(state,action)=>{
           state.infos.status = "rejected";
           state.infos.error = action.payload;
       },
       [getSingleInfo.pending]:(state)=>{
        state.singleInfo.status = 'pending'
        state.singleInfo.error = null
       },
       [getSingleInfo.fulfilled]:(state,action)=>{
           state.singleInfo.status = "resolved"
        }, 
       [getSingleInfo.rejected]:(state,action)=>{
       state.singleInfo.status = "rejected";
       state.singleInfo.error = action.payload;
       },

        [deleteInfo.pending]:(state)=>{
        state.deletedInfos.status = 'pending'
        state.deletedInfos.error = null
        },
       [deleteInfo.fulfilled]:(state,action)=>{
        state.deletedInfos.status = "resolved"
        }, 
        [deleteInfo.rejected]:(state,action)=>{
       state.deletedInfos.status = "rejected";
       state.deletedInfos.error = action.payload;
        },

        [postInfo.pending]:(state)=>{
            state.addInfo.status = 'pending'
            state.addInfo.error = null
        },
        [postInfo.fulfilled]:(state,action)=>{
            state.addInfo.status = "resolved"
        }, 
        [postInfo.rejected]:(state,action)=>{
            state.addInfo.status = "rejected";
            state.addInfo.error = action.payload;
        },

        [editSingleInfo.pending]:(state)=>{
            state.editInfo.status = 'pending'
            state.editInfo.error = null
        },
        [editSingleInfo.fulfilled]:(state,action)=>{
            state.editInfo.status = "resolved"
        }, 
        [editSingleInfo.rejected]:(state,action)=>{
            state.editInfo.status = "rejected";
            state.editInfo.error = action.payload;
        },
        [filteredInfo.pending]:(state)=>{
            state.filterInfo.status = 'pending'
            state.filterInfo.error = null
        },
        [filteredInfo.fulfilled]:(state,action)=>{
            state.filterInfo.status = "resolved"
        }, 
        [filteredInfo.rejected]:(state,action)=>{
            state.filterInfo.status = "rejected";
            state.filterInfo.error = action.payload;
        },
    }
})

export const {setInfos,setSingleInfo,clearSingleInfo,setFilteredInfos}  =  infos.actions

export default infos.reducer