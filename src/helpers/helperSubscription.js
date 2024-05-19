import axios from 'axios'
import React from 'react'

export const getSubscription = async () => {
    try {
        const response= await axios.get('https://rindoor-backend.onrender.com/subscriptions/plans')
        // console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const postSubscription = async (plan) => {
    try {
        console.log('plan helper', plan)
        const response = await axios.post('https://rindoor-backend.onrender.com/subscriptions', plan )
        console.log('response post', response.data)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}

export const getUser = async (id) => {
    try {
        const response = await axios.get(`https://rindoor-backend.onrender.com/subscriptions/${id}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)         
    }
}

export const cancellSubscription = async (id) => {
    try {
        const response = await axios.put(`https://rindoor-backend.onrender.com/subscriptions/cancel/${id}`)
        console.log('response helper cancelled', response)
        return response
    } catch (error) {
        console.log(error)    
    }
}