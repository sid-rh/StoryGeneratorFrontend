import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const user=JSON.parse(localStorage.getItem('users'));

const initialState={
    user:user?user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
}

export const register=createAsyncThunk('auth/register',async(user,thunkAPI)=>{
    try {
        return await authService.register(user)
    } catch (error) {
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString();
        return thunkAPI.rejectWithValue(error.response.data);
    }
});

export const login=createAsyncThunk('auth/login',async(user,thunkAPI)=>{
    try {
        return await authService.login(user)
    } catch (error) {
        const message=(error.response&&error.response.data&&error.response.data.message)||error.message||error.toString();
        // console.log({error:error.response.data});
        return thunkAPI.rejectWithValue(error.response.data);
        // throw new Error(error);
    }
});

export const logout=createAsyncThunk('auth/logout',
async(user)=>{
    await authService.logout(user)
})

export const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setCredentials:(state,action)=>{
            state.user=action.payload;
            localStorage.setItem('users',JSON.stringify(action.payload));
        },
        resetCredentials:(state,action)=>{
            state.user=null;
            localStorage.removeItem('users');
        },
        reset:(state)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=false
            state.message=''
            localStorage.removeItem('users')

        }
    },
    extraReducers:(builder)=>{
        builder 
            .addCase(register.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(register.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.user=action.payload
            })
            .addCase(register.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.user=null
            })
            .addCase(login.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.user=action.payload
            })
            .addCase(login.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.user=null
            })
            .addCase(logout.fulfilled,(state)=>{
                state.user=null
            })
    }
})

export const {reset,setCredentials,resetCredentials}=authSlice.actions;
export default authSlice.reducer;
