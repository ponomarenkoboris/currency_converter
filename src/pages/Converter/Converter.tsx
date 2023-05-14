import { useContext, useEffect } from 'react';
import { baseSliceSelector, currencyActionCreators } from '../../store';
import { ConverterContext, ActionType } from './ConverterContext';
import { SwapOutlined } from '@ant-design/icons';
import { CurrencyInput } from '../../components/form';
import { useStoreDispatch, useCurrencyActions } from '../../hooks';
import { Button, Col, Row } from 'antd';
import { useSelector } from 'react-redux';

export const Converter = () => {
	const { convertToBase } = currencyActionCreators();
	const storeDispatch = useStoreDispatch();
	const { getAllCurrrencies } = useCurrencyActions();
	const { currencies } = useSelector(baseSliceSelector)

	const { state, dispatch } = useContext(ConverterContext);

	const onSwap = () => {
		dispatch({ type: ActionType.SWAP_CURRENCY })
	}

	useEffect(() => {
		const abortController = new AbortController()
		const convertConfig  = { convertCode: state.to.currency, base: state.from.currency, signal: abortController.signal }

		storeDispatch(convertToBase(convertConfig)).unwrap()
			.then((result) => {

				if (result) {
					const value = String(result[convertConfig.convertCode] * +state.from.amount)
					dispatch({ type: ActionType.CONVERTATION_RESULT, payload: value })
				}
			})
		
	}, [state.from, state.to.currency])

	useEffect(() => {
		if (!currencies.length) {
			const config = { base: state.from.currency, signal: new AbortController().signal }
			getAllCurrrencies(config)
		}
	}, [])

    return (
        <div className="converter-view">
			<Row justify='center'>
				<Col span={5}>
					<CurrencyInput role="from" />
				</Col>
				<Col span={1}>
					<Button onClick={onSwap} >
						<SwapOutlined />
					</Button>
				</Col>
				<Col span={5}>
					<CurrencyInput role="to" />
				</Col>
			</Row>
		</div>
    )
}