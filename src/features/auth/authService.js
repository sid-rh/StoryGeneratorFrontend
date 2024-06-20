import axios from "axios";

const API_URL='/user/';

const register=async(userData)=>{
    const response=await axios.post(API_URL+'register',userData);

    if(response.data)
    {
        localStorage.setItem('users',JSON.stringify(response.data))
    }
    console.log(response.data);

    return response.data
}

const login=async(userData)=>{
    const response=await axios.post(API_URL+'login',userData);

    if(response.data)
    {
        localStorage.setItem('users',JSON.stringify(response.data));
    }
    console.log({res:response.data});
    return response.data
}



const logout=async(user)=>{
    // const config={
    //     headers:{
    //         'Authorization':'Bearer '+user.token
    //     }
    // }
    const response=await axios.post(API_URL+'logout',user.user._id);
    console.log({LogoutResponse:response});
    
}

const authService={
    register, logout, login
}

export default authService;