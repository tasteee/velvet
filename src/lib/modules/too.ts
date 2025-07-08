import { to } from 'await-to-js'

type ReturnT<ResultT> = Promise<{
	didFail: boolean
	error: Error | null | undefined
	data: ResultT | null | undefined
}>

export async function too<ResultT>(promise: Promise<ResultT>): ReturnT<ResultT> {
	const [error, data] = await to<ResultT>(promise)
	const final = { didFail: !!error, error, data }
	return final
}
