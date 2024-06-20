import axios from 'axios';

const API_URL="/story/";

const getAllStories=async(payload)=>{
    const response=await axios.post(API_URL+'getAll',payload);
    console.log(response.data);
    return response.data;
}

const getStoriesByUser=async(userId)=>{
    const response=await axios.post(API_URL+'getByUser',userId);
    console.log(response.data);
    return response.data;
}

const getLikedStories=async()=>{
    const response=await axios.post(API_URL+'getLiked');
    console.log(response.data);
    return response.data;
}

const getSingleStory=async(id)=>{
    const response=await axios.post(API_URL+'getSingle',id);
    console.log(response.data);
    return response.data;
}

const createStory=async(payload)=>{
    const response=await axios.post(API_URL+'create',payload);
    console.log(response.data);
    return response.data;
}

const likeStory=async(payload)=>{
    const response=await axios.post(API_URL+'like',payload);
    console.log(response.data);
    return response.data;
}

const unlikeStory=async(payload)=>{
    const response=await axios.post(API_URL+'unlike',payload);
    console.log(response.data);
    return response.data;
}

const saveStory=async(payload)=>{
    const response=await axios.post(API_URL+'save',payload);
    console.log(response.data);
    return response.data;
}

const unsaveStory=async(payload)=>{
    const response=await axios.post(API_URL+'unsave',payload);
    console.log(response.data);
    return response.data;
}

const getSavedStories=async(payload)=>{
    const response=await axios.post(API_URL+'getSaved',payload);
    console.log(response.data);
    return response.data
}

const generateStories=async(payload)=>{
    const response=await axios.post(API_URL+'generate',payload);
    console.log(response.data);
    return response.data;
}

const storyService={getAllStories,
                    getStoriesByUser,
                    getLikedStories,
                    getSingleStory,
                    createStory,
                    likeStory,
                    unlikeStory,
                    saveStory,
                    unsaveStory,
                    getSavedStories,
                    generateStories,
                
                };

export default storyService;