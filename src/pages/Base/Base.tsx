import { useLayoutEffect, useRef, useCallback } from 'react';
import { useCurrencyActions, useStoreSelector } from '../../hooks'
import { CurrencySelect } from '../../components/form'
import { type IntervalControlType, startExactInterval, killExactInterval } from '../../utils'
import { baseSliceSelector } from '../../store'
import { Col, Row, Card, Button } from 'antd';


export const Base = () => {
	const { base, currencies } = useStoreSelector(baseSliceSelector)
	const { getAllCurrrencies } = useCurrencyActions()
	const intervalControl = useRef<IntervalControlType>(null)

	const onBaseChange = useCallback((value: string) => {
		const startParams = {
			intervalCb: getAllCurrrencies, 
			ref: intervalControl, 
			base: value, 
		}
		startExactInterval(startParams)
	}, [base])

	const onUpdateStore = () => {
		const startParams = {
			intervalCb: getAllCurrrencies, 
			ref: intervalControl, 
			base, 
		}
		startExactInterval(startParams)
	}

	useLayoutEffect(() => {
		const startParams = {
			intervalCb: getAllCurrrencies, 
			ref: intervalControl, 
			base, 
		}
		startExactInterval(startParams)

		return () => {
			killExactInterval(intervalControl)
		}
	}, [])

    return (
        <div className="base-view">
			<Row gutter={10} justify='center' style={{ marginBottom: '20px' }}>
				<Col span={3}>
					<CurrencySelect 
						style={{ width: '100%' }}
						defaultValue={base}
						onChange={onBaseChange}
					/>
				</Col>
				<Col span={1}>
					<Button onClick={onUpdateStore} type="primary">Обновить</Button>
				</Col>
			</Row>
			<Row gutter={10}>
				{currencies.map((curr) => 
					<Col style={{ marginBottom: '10px' }} key={curr.code} span={4}>
						<Card title={`${curr.symbol} ${curr.toBase || ''}`}>
							<p>Код: {curr.code}</p>
							<p>Название: {curr.name}</p>
						</Card>
					</Col>
				)}
			</Row>
			
		</div>
    )
}