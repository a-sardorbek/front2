import api from "../../Utils/api"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"


export const deleteJob = createAsyncThunk(
    "infos_slice/deleteJob",
    async function (id,{rejectWithValue,dispatch}){
        try {
            let response = await api.delete(`/api/profession/delete?professionId=${id}`)
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


export const jobs = createSlice({
    name:"infos_slice",
    initialState:{
       deletedjob:{
        status:null,
        error:null
      }
    },
    reducers:{
        
    },
    extraReducers:{
        [deleteJob.pending]:(state)=>{
        state.deletedjob.status = 'pending'
        state.deletedjob.error = null
        },
       [deleteJob.fulfilled]:(state,action)=>{
        state.deletedjob.status = "resolved"
        }, 
        [deleteJob.rejected]:(state,action)=>{
       state.deletedjob.status = "rejected";
       state.deletedjob.error = action.payload;
        },
    }
})

export const {}  =  jobs.actions

export default jobs.reducer