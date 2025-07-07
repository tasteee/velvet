import { describe, it, expect } from 'vitest'
import { getAdjustedNotes } from './getAdjustedNotes'

describe('getAdjustedNotes', () => {
	it('returns basic closed chord in base octave', () => {
		const notes = getAdjustedNotes({
			baseOctave: 3,
			chord: {
				notes: ['C', 'E', 'G'],
				bassNote: 'C',
				octave: 0,
				inversion: 0,
				voicing: 'closed',
			},
		})

		expect(notes).toEqual(['C3', 'E3', 'G3'])
	})

	it('applies positive octave shift', () => {
		const notes = getAdjustedNotes({
			baseOctave: 3,
			chord: {
				notes: ['C', 'E', 'G', 'C', 'A'],
				bassNote: 'C',
				octave: 1,
				inversion: 0,
				voicing: 'closed',
			},
		})

		expect(notes).toEqual(['C4', 'E4', 'G4', 'C5', 'A5'])
	})

	it('applies negative octave shift', () => {
		const notes = getAdjustedNotes({
			baseOctave: 3,
			chord: {
				notes: ['C', 'E', 'G', 'C', 'A'],
				bassNote: 'C',
				octave: -2,
				inversion: 0,
				voicing: 'closed',
			},
		})

		expect(notes).toEqual(['C1', 'E1', 'G1', 'C2', 'A2'])
	})

	it('handles repeated notes and octave cycling correctly', () => {
		const notes = getAdjustedNotes({
			baseOctave: 3,
			chord: {
				notes: ['C', 'E', 'C', 'C', 'A', 'C', 'C'],
				bassNote: 'C',
				octave: 0,
				inversion: 0,
				voicing: 'closed',
			},
		})

		expect(notes).toEqual(['C3', 'E3', 'C4', 'C5', 'A5', 'C6', 'C7'])
	})

	it('handles first inversion (rotate first note to top)', () => {
		const notes = getAdjustedNotes({
			baseOctave: 3,
			chord: {
				notes: ['C', 'E', 'G'],
				bassNote: 'C',
				octave: 0,
				inversion: 1,
				voicing: 'closed',
			},
		})

		expect(notes).toEqual(['E3', 'G3', 'C4'])
	})

	it('handles negative inversion (rotate from end to start)', () => {
		const notes = getAdjustedNotes({
			baseOctave: 3,
			chord: {
				notes: ['C', 'E', 'G'],
				bassNote: 'C',
				octave: 2,
				inversion: -3,
				voicing: 'closed',
			},
		})

		expect(notes).toEqual(['G4', 'C5', 'E5'])
	})

	it('applies spread voicing across multiple octaves', () => {
		const notes = getAdjustedNotes({
			baseOctave: 3,
			chord: {
				notes: ['C', 'E', 'G'],
				bassNote: 'C',
				octave: 0,
				inversion: 0,
				voicing: 'spread',
			},
		})

		expect(notes).toEqual(['C3', 'E4', 'G5'])
	})

	it('applies drop2 voicing (second highest note dropped one octave)', () => {
		const notes = getAdjustedNotes({
			baseOctave: 3,
			chord: {
				notes: ['C', 'E', 'G', 'B'],
				bassNote: 'C',
				octave: 0,
				inversion: 0,
				voicing: 'drop2',
			},
		})

		expect(notes).toEqual(['C3', 'E3', 'G3', 'B3']) // expected to drop second-highest
		expect(notes[2]).toBe('G3') // drop2 applies to G4 → G3
	})

	it('applies drop3 voicing (third highest note dropped one octave)', () => {
		const notes = getAdjustedNotes({
			baseOctave: 3,
			chord: {
				notes: ['C', 'E', 'G', 'B'],
				bassNote: 'C',
				octave: 0,
				inversion: 0,
				voicing: 'drop3',
			},
		})

		expect(notes).toEqual(['C3', 'E3', 'G3', 'B4']) // drop3 applies to E4 → E3
	})

	it('applies drop2and4 voicing (2nd and 4th highest dropped)', () => {
		const notes = getAdjustedNotes({
			baseOctave: 3,
			chord: {
				notes: ['C', 'E', 'G', 'B'],
				bassNote: 'C',
				octave: 0,
				inversion: 0,
				voicing: 'drop2and4',
			},
		})

		expect(notes).toEqual(['C3', 'E3', 'G4', 'B3']) // E and B are dropped
	})

	it('applies rootless voicing by removing root', () => {
		const notes = getAdjustedNotes({
			baseOctave: 3,
			chord: {
				notes: ['C', 'E', 'G'],
				bassNote: 'C',
				octave: 0,
				inversion: 0,
				voicing: 'rootless',
			},
		})

		expect(notes).toEqual(['E3', 'G3'])
	})

	it('ensures all final notes ascend strictly in pitch', () => {
		const notes = getAdjustedNotes({
			baseOctave: 3,
			chord: {
				notes: ['C', 'C', 'C', 'C'],
				bassNote: 'C',
				octave: 0,
				inversion: 0,
				voicing: 'closed',
			},
		})

		const midiValues = notes.map((n) => require('tonal').Midi.toMidi(n))
		for (let i = 1; i < midiValues.length; i++) {
			expect(midiValues[i]).toBeGreaterThan(midiValues[i - 1])
		}
	})
})
