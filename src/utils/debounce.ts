export const debounce = (callback: Function, ms: number) => {
	let timeoutId: ReturnType<typeof setTimeout>

	return <T>(...args: T[]) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => callback.apply(null, args), ms)
	}
}