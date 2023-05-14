import { bindActionCreators } from "@reduxjs/toolkit";
import { currencyActionCreators } from '../../store';
import { useStoreDispatch } from "./useStoreDispatch";

export const useCurrencyActions = () => {
	const dispatch = useStoreDispatch()
	const { getAllCurrrencies } = currencyActionCreators()
	return bindActionCreators({ getAllCurrrencies }, dispatch)
}