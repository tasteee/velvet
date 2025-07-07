const removeIndex = (array: string[], index: number) => {
	return array.toSpliced(index, 1)
}

const unique = (array: string[]) => {
	return Array.from(new Set(array))
}

const without = (target: any[], source: any) => {
	return target.filter((item) => item !== source)
}

const includesSome = (target: any[], source: any[]) => {
	return source.some((item) => target.includes(item))
}

const includesAll = (target: any[], source: any[]) => {
	return source.every((item) => target.includes(item))
}

const matchId = (id: string) => {
	return (item: any) => item.id === id
}

const unmatchId = (id: string) => {
	return (item: any) => item.id !== id
}

export const arrays = {
	removeIndex,
	unique,
	without,
	includesSome,
	includesAll,
	matchId,
	unmatchId
}