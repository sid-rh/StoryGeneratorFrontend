import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storyService from "./storyService";

const initialState={
    story:null,
    singleStory:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
    storyTitle:null,
    storyContent:null,
    totalCount:0,
}

export const getAllStories=createAsyncThunk('story/getAllStories',async(payload,thunkApi)=>{
    try {
        return await storyService.getAllStories(payload);
    } catch (error) {
        console.log(error);
    }
});

export const getSingleStory=createAsyncThunk('story/getSingleStory',async(storyId,thunkApi)=>{
    try {
        return await storyService.getSingleStory(storyId);
    } catch (error) {
        console.log(error);
    }
});

export const createStory=createAsyncThunk('story/createStory',async(payload,thunkApi)=>{
    try {
        return await storyService.createStory(payload);
    } catch (error) {
        console.log(error);
    }
});

export const getStoriesByUser=createAsyncThunk('story/getStoriesByUser',async(payload,thunkApi)=>{
    try {
        return await storyService.getStoriesByUser(payload);
    } catch (error) {
        console.log(error);
    }
});

export const likeStory=createAsyncThunk('story/likeStory',async(payload,thunkApi)=>{
    try {
        return await storyService.likeStory(payload);
    } catch (error) {
        console.log(error);
    }
});
export const unlikeStory=createAsyncThunk('story/unlikeStory',async(payload,thunkApi)=>{
    try {
        return await storyService.unlikeStory(payload);
    } catch (error) {
        console.log(error);
    }
});

export const saveStory=createAsyncThunk('story/saveStory',async(payload,thunkApi)=>{
    try {
        return await storyService.saveStory(payload);
    } catch (error) {
        console.log(error);
    }
});
export const unsaveStory=createAsyncThunk('story/unsaveStory',async(payload,thunkApi)=>{
    try {
        return await storyService.unsaveStory(payload);
    } catch (error) {
        console.log(error);
    }
});

export const getSavedStories=createAsyncThunk('story/getSavedStories',async(payload,thunkApi)=>
{
    try {
        return await storyService.getSavedStories(payload);
    } catch (error) {
        console.log(error);
    }
});

export const generateStories=createAsyncThunk('story/generateStories',async(payload,thunkApi)=>{
    try {
        return await storyService.generateStories(payload);
    } catch (error) {
        console.log(error);
    }
})

export const storySlice=createSlice({
    name:'story',
    initialState,
    reducers:{
        resetSingleStory:(state,action)=>
        {
            state.singleStory=null
            state.isLoading=false
            state.isSuccess=false
            state.isError=false
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllStories.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getAllStories.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.story=action.payload[0].paginatedresult
                state.totalCount=action.payload[0].totalcount[0].count
            })
            .addCase(getAllStories.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.story=null
                state.totalCount=0
            })
            .addCase(getSingleStory.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getSingleStory.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.singleStory=action.payload
            })
            .addCase(getSingleStory.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.singleStory=null
            })
            .addCase(getStoriesByUser.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getStoriesByUser.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.story=action.payload[0].paginatedresult
                state.totalCount=action.payload[0]?.totalcount[0]?.count
            })
            .addCase(getStoriesByUser.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.story=null
                state.totalCount=0
            })
            .addCase(getSavedStories.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getSavedStories.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.story=action.payload[0].paginatedresult
                state.totalCount=action.payload[0]?.totalcount[0]?.count
            })
            .addCase(getSavedStories.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.story=null
                state.totalCount=0
            })
            .addCase(generateStories.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(generateStories.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.storyTitle=action.payload.title
                state.storyContent=action.payload.content
            })
            .addCase(generateStories.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.message=action.payload
                state.storyTitle=null
                state.storyContent=null
            })
    }
});

export const {resetSingleStory}=storySlice.actions;
export default storySlice.reducer;