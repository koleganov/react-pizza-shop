import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { search, category, sort, currentPage } = params;
    const { data } = await axios.get(
      `https://63ef5c5c4d5eb64db0c7c12b.mockapi.io/pizzas?page=${currentPage}&limit=4${category}&sortBy=${sort.sortProperty}&order=${sort.order}${search}`
    );
    return data;
  }
);

const initialState = {
  items: [],
  status: "loading", // loading, success, error
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = "loading";
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = "error";
      state.items = [];
    },
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
