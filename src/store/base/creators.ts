import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CurrencyType } from "./types";
import { AVALIABLE_CURR_URI, CONVERTER_URI } from "../../utils";

type ConvertPropsType = { convertCode: string, base: string, signal: AbortController['signal'] }
type ConvertReturnType = { [key: string]: number } | null

const convertToBase = createAsyncThunk<ConvertReturnType, ConvertPropsType>(
	'base/convertToBase',
	async ({ convertCode, base, signal }) => {
		const url = `${CONVERTER_URI}&base_currency=${base}&currencies=${convertCode}`

		try {
			const response = await fetch(url, { signal });
			const { data } = await response.json()
			return data
		} catch (error) {
			console.error(error)
			return null
		}
	}
)

type GetAllCurrrenciesReturnType = {
	currencies: CurrencyType[],
	base: string
}

const getAllCurrrencies = createAsyncThunk<GetAllCurrrenciesReturnType | null, { base: string, signal: AbortController['signal'] }>(
	'base/getAllCurrencies',
	async ({ base, signal }, thunkAPI) => {
		try {
			const response = await fetch(AVALIABLE_CURR_URI, { signal });
			const { data } = await response.json();

			const result: GetAllCurrrenciesReturnType = { currencies: [], base };
			let convertCode: string = ''

			for (const key in data) {
				result.currencies.push(data[key])
				convertCode += convertCode ? `,${key}` : key
			}

			const convertedCurr = await thunkAPI.dispatch(convertToBase({ convertCode, base, signal })).unwrap()

			if (convertedCurr) {
				for (const currency of result.currencies) {
					currency.toBase = convertedCurr[currency.code]
				}
			}

			thunkAPI.fulfillWithValue(result)
			return result
		} catch (error) {
			thunkAPI.rejectWithValue(null)
			console.error(error)
			return null
		}
	}
)

export {
	getAllCurrrencies,
	convertToBase
}