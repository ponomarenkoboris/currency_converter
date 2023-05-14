import { MutableRefObject } from 'react';

export type IntervalControlType = {
	id: ReturnType<typeof setInterval>,
	controller: AbortController
} | null

const exactInterval = (callback: Function, s: number): ReturnType<typeof setInterval> => {

	callback()
	let lastCallTime = Date.now()
	
	const intrevalId = setInterval(async () => {
		const currentTime = Date.now();

		if (currentTime - lastCallTime >= s * 1000) {
			lastCallTime = currentTime
			callback()
		}

	}, 100)

	return intrevalId
}

type StartExaclIntervalProps = {
	intervalCb: Function, 
	ref: MutableRefObject<IntervalControlType>, 
	base: string,
}

const startExactInterval = ({ intervalCb, ref, base }: StartExaclIntervalProps) => {
	if (ref.current) {
		const { id, controller } = ref.current
		clearInterval(id)
		controller.abort()
	}

	const abortController = new AbortController()
	const interval = {
		id: exactInterval(() => intervalCb({ base, signal: abortController.signal }), 1),
		controller: abortController
	}

	ref.current = interval
}

const killExactInterval = (ref: MutableRefObject<IntervalControlType>) => {
	if (ref.current) {
		const { id, controller } = ref.current

		clearInterval(id)
		controller.abort()

	}
}

export {
	startExactInterval,
	killExactInterval
}