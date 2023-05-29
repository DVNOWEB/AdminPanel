import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import orderService from './orderService'

export const initialState = {
  orders: [],
  error: null,
  loading: false,
}

export const getOrders = createAsyncThunk(
  'orderList/getAll',
  async (_, thunkAPI) => {
    try {
      return await orderService.getAllAsync('orders')
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const deleteOrder = createAsyncThunk(
  'orderList/delete',
  async (orderId, thunkAPI) => {
    try {
      await orderService.deleteOrder(orderId)
      return orderId
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const updateOrder = createAsyncThunk(
  'orderList/update',
  async (orderData, thunkAPI) => {
    try {
      await orderService.updateOrder(orderData)
      return orderData
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message)
    }
  }
)

export const orderSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {
    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload
      const order = state.orders.find((order) => order.id === id)
      order.status = status
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.orders = action.payload
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(deleteOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        )
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(updateOrder.pending, (state) => {
        state.loading = true
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        const { id, status } = action.payload
        const order = state.orders.find((order) => order.id === id)
        if (order) {
          order.status = status
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { updateOrderStatus } = orderSlice.actions
export default orderSlice.reducer
