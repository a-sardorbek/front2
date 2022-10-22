import api from "../../Utils/api"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"

//super-admin gets all  dashboard data
export const getDashboardInfo = createAsyncThunk(
    "cities_jobs_slice/getDashboardInfo",
    async function (url,{rejectWithValue,dispatch}){
        try {
            let response = await api.get(`/api/${url}`)
            if (response.status === 200 || response.status === 201){
                 dispatch(setDashBoardInfo(response.data))
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



export const cities_jobs = createSlice({
    name:"cities_jobs_slice",
    initialState:{
        clientCount: null,
        clientFixedCount: null,
        clientUnfixedCount: null,
        adminCount: null
    },
    reducers:{
        setDashBoardInfo:(state,action)=>{
            state.clientCount = action.payload.clientCount
            state.clientFixedCount = action.payload.clientFixedCount
            state.clientUnfixedCount = action.payload.clientUnfixedCount
            state.adminCount = action.payload.adminCount
        },
    },
    extraReducers:{
        [getDashboardInfo.pending]:(state)=>{
            state.status = 'pending'
            state.error = null
        },
       [getDashboardInfo.fulfilled]:(state,action)=>{
            state.status = "resolved"
       }, 
       [getDashboardInfo.rejected]:(state,action)=>{
           state.status = "rejected";
           state.error = action.payload;
       },

    }
})

export const {setDashBoardInfo}  =  cities_jobs.actions

export default cities_jobs.reducer