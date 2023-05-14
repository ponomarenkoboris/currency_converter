import { createSelector } from '@reduxjs/toolkit';
import type { BaseState, CurrencyType } from './types';
import type { RootState } from '..';

const selectAllCurrencies = (state: RootState): CurrencyType[] => state.base.currencies
const selectBaseCurrency = (state: RootState): BaseState['base'] => state.base.base
const selectIsLoading = (state: RootState): BaseState['isLoading'] => state.base.isLoading

const baseSliceSelector = createSelector(
	[selectAllCurrencies, selectBaseCurrency],
	(currencies, base) => ({ currencies, base })
)

const baseIsLoadingselector = createSelector(
	selectIsLoading,
	(isLoading) => isLoading
)

export {
	baseSliceSelector,
	baseIsLoadingselector
}