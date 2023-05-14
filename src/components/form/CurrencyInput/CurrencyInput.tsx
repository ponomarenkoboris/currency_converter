import { useContext } from 'react'
import { ConverterContext, ActionType, type ConverterStateKeys } from '../../../pages/Converter/ConverterContext'
import { Form, InputNumber } from 'antd'
import { CurrencySelect } from '../CurrencySelect/CurrencySelect'


export type InputValue = { amount: string, currency: string }

interface CurrencyInputProps {
	role: ConverterStateKeys,
}

export const CurrencyInput = ({ role }: CurrencyInputProps) => {
	const { state, dispatch } = useContext(ConverterContext);

	const onInputChange = (value: string | null) => {
		if (!value) return
		dispatch({ type: role === 'to' ? ActionType.UPDATE_AMOUNT_TO : ActionType.UPDATE_AMOUNT_FROM, payload: value })
	}

	const onSelectChange = (value: string) => {
		if (!value) return 
		dispatch({ type: role === 'from' ? ActionType.UPDATE_CURRENCY_FROM : ActionType.UPDATE_AMOUNT_FROM , payload: value })
	}

	return (
		<div>
			<Form.Item label={role}>
				<InputNumber 
					stringMode
					value={state[role].amount}
					onChange={onInputChange}
					addonAfter={<CurrencySelect style={{ width: 100 }} value={state[role].currency} onChange={onSelectChange}/>} 
				/>
			</Form.Item>
		</div>
	)
}