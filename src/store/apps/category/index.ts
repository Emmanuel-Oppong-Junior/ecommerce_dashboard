import { Dispatch } from 'redux'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'

interface DataParams {
  q: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

export const fetchData = createAsyncThunk('appUsers/fetchData', async (params: DataParams) => {
  const response = await axios.get('/apps/category/list', {
    params
  })

  return response.data
})

// ** Add Category
export const addCategory = createAsyncThunk(
  'appCategory/addCategory',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await axios.post('/apps/category/add-category', { data })
    dispatch(fetchData(getState().category.params))

    return response.data
  }
)

// ** Delete Category
export const deleteCategory = createAsyncThunk(
  'appCategory/deleteCategory',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete('/apps/category/delete', { data: id })
    dispatch(fetchData(getState().category.params))

    return response.data
  }
)

export const appCategoriesSlice = createSlice({
  name: 'appCategory',
  initialState: {
    data: [
      {
        name: 'Mobile Phones',
        description: 'mobile phones are good',
        image:
          'https://smfteapi.salesmate.app/Media/Products_Images/2f2c5aa2-1622-48ed-a40c-603d59b558ad_sam%20A07%203.jpg',
        id: 1
      },
      {
        name: 'Laptops',
        description: 'this is a laptop',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/7a487a06-d177-404d-914c-fae91e42ea48_bvbbv.png',
        id: 2
      },
      {
        name: 'Tablets',
        description: 'portable touchscreen devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/tablet_example.jpg',
        id: 3
      },
      {
        name: 'Smart Watches',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 4
      },
      {
        name: 'Smart Watches',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 5
      },
      {
        name: 'Smart Watches',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 6
      },
      {
        name: 'Smart Watches',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 7
      },
      {
        name: 'Smart Watches',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 8
      },
      {
        name: 'Smart Watches',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 9
      },
      {
        name: 'Smart Watches',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 10
      },
      {
        name: 'Smart Watches',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 11
      }
    ],
    total: 1,
    params: {},
    allData: []
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.categories
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appCategoriesSlice.reducer
