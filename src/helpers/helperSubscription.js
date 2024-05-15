import axios from 'axios'
import React from 'react'

export const getSubscription = async () => {
    try {
        const response= await axios.get('https://rindoor-backend.onrender.com/subscriptions/plans')
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export const postSubscription = async (plan) => {
    try {
        const response = await axios.post('https://rindoor-backend.onrender.com/subscriptions', plan )
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error)        
    }
}