"use client"
import React,{useState,useEffect} from 'react'
import { dataFormLogin,refreshAccessToken } from '@/server/action/server-auth.action'

const customAuthToken = () => {
    const[token,setToken] = useState()

  const login = async (data:any)=>{
     const userdata =  await dataFormLogin(data)
  }

  return {login}
    
}

export default customAuthToken