type ProjectStateT = {
	name: string
	bpm: number
	scaleRootNote: string
	scaleType: string
	description: string
	tags: string[]
	id?: string
}

class ProjectStore {
	state: ProjectStateT = $state({
		name: '',
		bpm: 93,
		id: '',
		scaleRootNote: 'F#',
		scaleType: 'Minor',
		description: '',
		tags: []
	})

	addTag = addTag
	removeTag = removeTag
}

const addTag = (tag: string) => {
	if (!projectStore.state.tags.includes(tag)) {
		projectStore.state.tags.push(tag)
	}
}

const removeTag = (tag: string) => {
	const index = projectStore.state.tags.indexOf(tag)
	if (index !== -1) {
		projectStore.state.tags.splice(index, 1)
	}
}

export const projectStore = new ProjectStore()
