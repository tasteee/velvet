type ProjectStateT = {
    name: string;
    bpm: number;
    scaleRootNote: string;
    scaleType: string;
    description: string;
    tags: string[];
    id?: string;
}

const state: ProjectStateT = $state({
    name: '',
    bpm: 93,
    id: '',
    scaleRootNote: 'F#',
    scaleType: 'minor',
    description: '',
    tags: [],
})

const addTag = (tag: string) => {
    if (!state.tags.includes(tag)) {
        state.tags.push(tag)
    }
}

const removeTag = (tag: string) => {
    const index = state.tags.indexOf(tag)
    if (index !== -1) {
        state.tags.splice(index, 1)
    }
}


export const projectStore = {
    state,
    addTag,
    removeTag,
}