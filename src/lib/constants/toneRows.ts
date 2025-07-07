const TONE_IDS_0 = ['T1-2', 'T2-2', 'T3-2', 'T4-2', 'T5-2', 'T6-2', 'T7-2', 'T8-2']
const TONE_IDS_1 = ['T1-1', 'T2-1', 'T3-1', 'T4-1', 'T5-1', 'T6-1', 'T7-1', 'T8-1']
const TONE_IDS_2 = ['T1-0', 'T2-0', 'T3-0', 'T4-0', 'T5-0', 'T6-0', 'T7-0', 'T8-0']
const TONE_IDS_3 = ['T1+1', 'T2+1', 'T3+1', 'T4+1', 'T5+1', 'T6+1', 'T7+1', 'T8+1']
const TONE_IDS_4 = ['T1+2', 'T2+2', 'T3+2', 'T4+2', 'T5+2', 'T6+2', 'T7+2', 'T8+2']
export const TONE_IDS = [TONE_IDS_0, TONE_IDS_1, TONE_IDS_2, TONE_IDS_3, TONE_IDS_4].flat()

export const TONE_ROWS = {
	T1: {
		id: 'T1',
		index: 0,
		octave: 0,
		signalIds: []
	},
	T2: {
		id: 'T2',
		index: 1,
		octave: 0,
		signalIds: []
	},
	T3: {
		id: 'T3',
		index: 2,
		octave: 0,
		signalIds: []
	},
	T4: {
		id: 'T4',
		index: 3,
		octave: 0,
		signalIds: []
	},
	T5: {
		id: 'T5',
		index: 4,
		octave: 0,
		signalIds: []
	},
	T6: {
		id: 'T6',
		index: 5,
		octave: 0,
		signalIds: []
	},
	T7: {
		id: 'T7',
		index: 6,
		octave: 0,
		signalIds: []
	},
	T8: {
		id: 'T8',
		index: 7,
		octave: 0,
		signalIds: []
	},

	// +1 OCTAVE TOTE ROWS

	'T1+1': {
		id: 'T1+1',
		index: 0,
		octave: 1,
		signalIds: []
	},
	'T2+1': {
		id: 'T2+1',
		index: 1,
		octave: 1,
		signalIds: []
	},
	'T3+1': {
		id: 'T3+1',
		index: 2,
		octave: 1,
		signalIds: []
	},
	'T4+1': {
		id: 'T4+1',
		index: 3,
		octave: 1,
		signalIds: []
	},
	'T5+1': {
		id: 'T5+1',
		index: 4,
		octave: 1,
		signalIds: []
	},
	'T6+1': {
		id: 'T6+1',
		index: 5,
		octave: 1,
		signalIds: []
	},
	'T7+1': {
		id: 'T7+1',
		index: 6,
		octave: 1,
		signalIds: []
	},
	'T8+1': {
		id: 'T8+1',
		index: 7,
		octave: 1,
		signalIds: []
	},

	// +2 OCTAVE TOTE ROWS

	'T1+2': {
		id: 'T1+2',
		index: 0,
		octave: 2,
		signalIds: []
	},
	'T2+2': {
		id: 'T2+2',
		index: 1,
		octave: 2,
		signalIds: []
	},
	'T3+2': {
		id: 'T3+2',
		index: 2,
		octave: 2,
		signalIds: []
	},
	'T4+2': {
		id: 'T4+2',
		index: 3,
		octave: 2,
		signalIds: []
	},
	'T5+2': {
		id: 'T5+2',
		index: 4,
		octave: 2,
		signalIds: []
	},
	'T6+2': {
		id: 'T6+2',
		index: 5,
		octave: 2,
		signalIds: []
	},
	'T7+2': {
		id: 'T7+2',
		index: 6,
		octave: 2,
		signalIds: []
	},
	'T8+2': {
		id: 'T8+2',
		index: 7,
		octave: 2,
		signalIds: []
	},

	// -1 OCTAVE TOTE ROWS

	'T1-1': {
		id: 'T1-1',
		index: 0,
		octave: -1,
		signalIds: []
	},
	'T2-1': {
		id: 'T2-1',
		index: 1,
		octave: -1,
		signalIds: []
	},
	'T3-1': {
		id: 'T3-1',
		index: 2,
		octave: -1,
		signalIds: []
	},
	'T4-1': {
		id: 'T4-1',
		index: 3,
		octave: -1,
		signalIds: []
	},
	'T5-1': {
		id: 'T5-1',
		index: 4,
		octave: -1,
		signalIds: []
	},
	'T6-1': {
		id: 'T6-1',
		index: 5,
		octave: -1,
		signalIds: []
	},
	'T7-1': {
		id: 'T7-1',
		index: 6,
		octave: -1,
		signalIds: []
	},
	'T8-1': {
		id: 'T8-1',
		index: 7,
		octave: -1,
		signalIds: []
	},

	// -2 OCTAVE TOTE ROWS

	'T1-2': {
		id: 'T1-2',
		index: 0,
		octave: -2,
		signalIds: []
	},
	'T2-2': {
		id: 'T2-2',
		index: 1,
		octave: -2,
		signalIds: []
	},
	'T3-2': {
		id: 'T3-2',
		index: 2,
		octave: -2,
		signalIds: []
	},
	'T4-2': {
		id: 'T4-2',
		index: 3,
		octave: -2,
		signalIds: []
	},
	'T5-2': {
		id: 'T5-2',
		index: 4,
		octave: -2,
		signalIds: []
	},
	'T6-2': {
		id: 'T6-2',
		index: 5,
		octave: -2,
		signalIds: []
	},
	'T7-2': {
		id: 'T7-2',
		index: 6,
		octave: -2,
		signalIds: []
	},
	'T8-2': {
		id: 'T8-2',
		index: 7,
		octave: -2,
		signalIds: []
	}
}
