import { createSlice } from '@reduxjs/toolkit'
import React from 'react'

const initState = {
  recentId: "",
  recent: []

}

const userSlice = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    addRecentFn: (state, action) => {
      //배열안에 이미 있는지 판단 -> 없으면 추가
      const isIn = state.recent.includes(action.payload) 
      if (!isIn) {
        if (state.recent.length === 5) {
          state.recent.splice(0,1)
        }
        state.recent.push(action.payload)
      } 
      //-----------------------
    },
    deleteUserFn: (state, action) => {
      state.recent = []
      state.recentId = ""
    },
    updateRecentFn: (state, action) => {
      state.recent = action.payload

    },
    updateIdFn: (state, action) => {
      state.recentId = action.payload
    }
    // categoryDeleteFn: (state, action) => {
    //   const num = state.category[0].recent.findIndex(el => el === action.payload)
    //   state.category[0].recent.splice(num, 1)
    // }

  }
})

export const {addRecentFn, deleteUserFn, updateRecentFn , updateIdFn} = userSlice.actions
export default userSlice