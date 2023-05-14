import { memo } from 'react';
import { useStoreSelector } from '../../../hooks';
import { baseSliceSelector } from '../../../store';
import { Select, SelectProps } from "antd";

export const CurrencySelect = memo((props: SelectProps) => {
	const { currencies } = useStoreSelector(baseSliceSelector)
	return <Select {...props} options={currencies.map(curr => ({ label: curr.code, value: curr.code }))} />
})