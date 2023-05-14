import { createContext, useReducer, ReactNode, Dispatch } from 'react';

type ConverterState = {
	from: {
		amount: string,
		currency: string,
	},
	to: {
		amount: string,
		currency: string
	}
}

export type ConverterStateKeys = keyof ConverterState

type ConverterContextType = {
	state: ConverterState,
	dispatch: Dispatch<ActionCreator> 
}

export enum ActionType {
	UPDATE_AMOUNT_FROM = "UPDATE_AMOUNT_FROM",
	UPDATE_CURRENCY_FROM = "UPDATE_CURRENCY_FROM",
	UPDATE_CURRENCY_TO = "UPDATE_CURRENCY_TO",
	SWAP_CURRENCY = "SWAP_CURRENCY",
	CONVERTATION_RESULT = "CONVERTATION_RESULT",
	UPDATE_AMOUNT_TO = "UPDATE_AMOUNT_TO"
}

type ActionCreator = { type: ActionType.UPDATE_AMOUNT_FROM, payload: string }
	| { type: ActionType.UPDATE_CURRENCY_FROM, payload: string }
	| { type: ActionType.UPDATE_AMOUNT_TO, payload: string } 
	| { type: ActionType.UPDATE_CURRENCY_TO, payload: string }
	| { type: ActionType.CONVERTATION_RESULT, payload: string }
	| { type: ActionType.SWAP_CURRENCY };


const reducer = (state: ConverterState, action: ActionCreator): ConverterState => {
	switch (action.type) {
		case ActionType.UPDATE_AMOUNT_FROM:
			return { ...state, from: { ...state.from, amount: action.payload } }
		case ActionType.UPDATE_AMOUNT_TO:
			return { ...state, to: { ...state.to, amount: action.payload } }
		case ActionType.UPDATE_CURRENCY_FROM:
			return { ...state, from: { ...state.from, currency: action.payload } }
		case ActionType.UPDATE_CURRENCY_TO:
			return { ...state, to: { ...state.to, currency: action.payload } }
		case ActionType.SWAP_CURRENCY:
			const [fromCurrency, toCurrency] = [state.to.currency, state.from.currency]
			return { from: { ...state.from, currency: fromCurrency }, to: { ...state.to, currency: toCurrency } }
		case ActionType.CONVERTATION_RESULT:
			return { ...state, to: { ...state.to, amount: action.payload } }
		default:
			return state
	}
}

const initialState: ConverterState = {
	from: {
		amount: '1',
		currency: 'USD',
	},
	to: {
		amount: '',
		currency: 'RUB'
	}
}

export const ConverterContext = createContext<ConverterContextType>({ state: initialState, dispatch: () => null })

type ConverterContextProviderProps = {
	children: ReactNode
}

export const ConverterContextProvider = ({ children }: ConverterContextProviderProps) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	return <ConverterContext.Provider value={{ state, dispatch }}>{children}</ConverterContext.Provider>
}