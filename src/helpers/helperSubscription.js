import axios from 'axios'
import React from 'react'


const URL_SUBSCRIPTION= process.env.NEXT_PUBLIC_API_URL_SUBSCRIPTION
const URL_SUBSCRIPTION_CANCEL= process.env.NEXT_PUBLIC_API_URL_SUBSCRIPTION_CANCEL
const URL_SUBSCRIPTION_PLANS= process.env.NEXT_PUBLIC_API_URL_SUBSCRIPTION_PLANS

export const getSubscription = async () => {
    const token = localStorage.getItem("token");
    try {
        const response= await axios.get(URL_SUBSCRIPTION_PLANS,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const postSubscription = async (plan) => {
    const token = localStorage.getItem("token");
    try {
        console.log('plan helper', plan)
        const response = await axios.post(URL_SUBSCRIPTION, plan ,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
        console.log('response post', response.data)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const getUser = async (id) => {
    try {
        const response = await axios.get(`${URL_SUBSCRIPTION}/${id}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)         
    }
}

export const cancellSubscription = async (id) => {
    try {
        const response = await axios.put(`${URL_SUBSCRIPTION_CANCEL}/${id}`)
        console.log('response helper cancelled', response)
        return response
    } catch (error) {
        console.log(error)    
    }
}