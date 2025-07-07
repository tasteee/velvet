const state = $state({
	gridSize: 'medium', // 'small', 'medium', 'large'
	theme: 'light', // 'light', 'dark'
})

const setGridSize = (size: 'small' | 'medium' | 'large') => state.gridSize = size
const setTheme = (theme: 'light' | 'dark') => state.theme = theme

export const settingsStore = {
	get state() { return state },
	setGridSize,
	setTheme,
}