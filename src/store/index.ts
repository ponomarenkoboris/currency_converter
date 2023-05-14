import { combineReducers, configureStore } from "@reduxjs/toolkit";
import baseSlice, { baseSliceSelector, baseIsLoadingselector, getAllCurrrencies, convertToBase } from "./base/baseSlice";

const rootReducer = combineReducers({
	base: baseSlice
})

const store = configureStore({
	reducer: rootReducer
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const currencyActionCreators = () => ({ getAllCurrrencies, convertToBase })

export {
	currencyActionCreators,
	baseSliceSelector,
	baseIsLoadingselector
}