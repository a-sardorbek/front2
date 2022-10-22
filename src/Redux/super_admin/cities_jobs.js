import api from "../../Utils/api"
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit"

//super-admin gets all cities
export const getAllCities = createAsyncThunk(
    "cities_jobs_slice/getAllCities",
    async function (adminData,{rejectWithValue,dispatch}){
        try {
            let response = await api.get(`/api/city/all`)
            if (response.status === 200 || response.status === 201){
                 dispatch(setCities(response.data))
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


//super-admin gets all jobs
export const getAllJobs = createAsyncThunk(
    "cities_jobs_slice/getAllJobs",
    async function (adminData,{rejectWithValue,dispatch}){
        try {
            let response = await api.get(`/api/profession/all`)
            if (response.status === 200 || response.status === 201){
                 dispatch(setJobs(response.data))
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



//super-admin gets all true cities
export const getAllAvailableCities = createAsyncThunk(
    "cities_jobs_slice/getAllAvailableCities",
    async function (adminData,{rejectWithValue,dispatch}){
        try {
            let response = await api.get(`/api/city/all-available`)
            if (response.status === 200 || response.status === 201){
                 dispatch(setAvailableCities(response.data))
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

//super-admin edit all professions
export const editProfessions = createAsyncThunk(
    "userSlice/editProfessions",
    async function (userData, { rejectWithValue, dispatch }) {
      try {
        let response = await api.post(
          `/api/profession`,
          userData
        );
        if (response.status === 200 || response.status === 201) {
        }
        if (!response.status) {
          throw new Error("Internal Server Error");
        }
        return {};
      } catch (error) {
        return rejectWithValue(error.response.data.message || error.message);
      }
    }
  );



export const cities_jobs = createSlice({
    name:"cities_jobs_slice",
    initialState:{
       cities:{
         data:[],
         status:null,
         error:null
       },
       availableCities:{
        data:[],
        status:null,
        error:null
      },
       jobs:{
        data:[],
        status:null,
        error:null
       }
    },
    reducers:{
        setCities:(state,action)=>{
            state.cities.data = action.payload
        },
        setJobs:(state,action)=>{
            state.jobs.data = action.payload
        },
        setAvailableCities:(state,action)=>{
            state.availableCities.data = action.payload
        }
    },
    extraReducers:{
        [getAllCities.pending]:(state)=>{
            state.cities.status = 'pending'
            state.cities.error = null
        },
       [getAllCities.fulfilled]:(state,action)=>{
            state.cities.status = "resolved"
       }, 
       [getAllCities.rejected]:(state,action)=>{
           state.cities.status = "rejected";
           state.cities.error = action.payload;
       },

       [getAllJobs.pending]:(state)=>{
        state.jobs.status = 'pending'
        state.jobs.error = null
    },
      [getAllJobs.fulfilled]:(state,action)=>{
        state.jobs.status = "resolved"
   }, 
     [getAllJobs.rejected]:(state,action)=>{
       state.jobs.status = "rejected";
       state.jobs.error = action.payload;
   },

   [getAllAvailableCities.pending]:(state)=>{
    state.availableCities.status = 'pending'
    state.availableCities.error = null
},
  [getAllAvailableCities.fulfilled]:(state,action)=>{
    state.availableCities.status = "resolved"
}, 
 [getAllAvailableCities.rejected]:(state,action)=>{
   state.availableCities.status = "rejected";
   state.availableCities.error = action.payload;
},
[editProfessions.pending]: (state) => {
    state.status = "pending";
    state.error = null;
  },
  [editProfessions.fulfilled]: (state, action) => {
    state.status = "resolved";
  },
  [editProfessions.rejected]: (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
  },
    }
})

export const {setCities,setJobs,setAvailableCities}  =  cities_jobs.actions

export default cities_jobs.reducer