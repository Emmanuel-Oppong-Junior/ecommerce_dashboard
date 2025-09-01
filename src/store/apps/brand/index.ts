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

export const fetchData = createAsyncThunk('appBrands/fetchData', async (params: DataParams) => {
  const response = await axios.get('/apps/brand/list', {
    params
  })

  return response.data
})

// ** Add Brand
export const addBrand = createAsyncThunk(
  'appBrand/addBrand',
  async (data: { [key: string]: number | string }, { getState, dispatch }: Redux) => {
    const response = await axios.post('/apps/brand/add-brand', { data })
    dispatch(fetchData(getState().category.params))

    return response.data
  }
)

// ** Delete Brand
export const deleteBrand = createAsyncThunk(
  'appBrand/deleteBrand',
  async (id: number | string, { getState, dispatch }: Redux) => {
    const response = await axios.delete('/apps/brand/delete', { data: id })
    dispatch(fetchData(getState().category.params))

    return response.data
  }
)

export const appCategoriesSlice = createSlice({
  name: 'appBrand',
  initialState: {
    data: [
      {
        name: 'Samsung',
        description: 'mobile phones are good',
        image:
          'https://smfteapi.salesmate.app/Media/Products_Images/2f2c5aa2-1622-48ed-a40c-603d59b558ad_sam%20A07%203.jpg',
        id: 1
      },
      {
        name: 'Iphone',
        description: 'this is a laptop',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/7a487a06-d177-404d-914c-fae91e42ea48_bvbbv.png',
        id: 2
      },
      {
        name: 'Infinix',
        description: 'portable touchscreen devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/tablet_example.jpg',
        id: 3
      },
      {
        name: 'Itel',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 4
      },
      {
        name: 'Intel',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 5
      },
      {
        name: 'HP',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 6
      },
      {
        name: 'Dell',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 7
      },
      {
        name: 'Hisense',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 8
      },
      {
        name: 'Nokia',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 9
      },
      {
        name: 'Tecno',
        description: 'wearable smart devices',
        image: 'https://smfteapi.salesmate.app/Media/Products_Images/smartwatch_example.jpg',
        id: 10
      },
      {
        name: 'Amcon',
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
      state.data = action.payload.brands
      state.total = action.payload.total
      state.params = action.payload.params
      state.allData = action.payload.allData
    })
  }
})

export default appCategoriesSlice.reducer
