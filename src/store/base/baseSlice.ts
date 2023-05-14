import { createSlice } from '@reduxjs/toolkit';
import { getAllCurrrencies, convertToBase } from './creators';
import { baseSliceSelector, baseIsLoadingselector } from './selectors';
import type { BaseState } from './types';

const initialState: BaseState = {
	isLoading: false,
	base: 'USD',
	currencies: []
}

const baseSlice = createSlice({
	name: 'base',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(getAllCurrrencies.pending, (state) => {
				state.isLoading = true
			})
			.addCase(getAllCurrrencies.fulfilled, (state, { payload }) => {
				state.isLoading = false

				if (payload) {
					const { base, currencies } = payload
					const currenciesStr = JSON.stringify(state.currencies)
					const payloadStr = JSON.stringify(currencies)
					
					if (currencies && payloadStr !== currenciesStr) state.currencies = currencies
					if (state.base !== base) state.base = base
				}
			})
			.addCase(getAllCurrrencies.rejected, (state) => {
				state.isLoading = false
			})
			.addCase(convertToBase.pending, (state) => {
				state.isLoading = true
			})
			.addCase(convertToBase.fulfilled, (state) => {
				state.isLoading = false
			})
			.addCase(convertToBase.rejected, (state) => {
				state.isLoading = false
			})	
	}
})

export default baseSlice.reducer
export { getAllCurrrencies, convertToBase, baseSliceSelector, baseIsLoadingselector }