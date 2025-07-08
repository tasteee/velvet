import { numbers } from '$lib/modules/numbers'

// signal can start anywhere between 0 and 127 divisions
// signal can end anywhere between 1 and 128 divisions
const maxDivisions = 128 * 4
export const startClamp = numbers.createClamp({ min: 0, max: maxDivisions - 1 })
export const endClamp = numbers.createClamp({ min: 1, max: maxDivisions })
export const durationClamp = numbers.createClamp({ min: 1, max: 127 })