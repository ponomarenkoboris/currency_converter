export type CurrencyType = {
	code: string,
	decimal_digits: number,
	name: string,
	name_plural: string,
	rounding: number,
	symbol: string,
	symbol_native: string,
	toBase?: number
}

export type BaseState = {
	isLoading: boolean,
	base: string,
	currencies: CurrencyType[]
}
