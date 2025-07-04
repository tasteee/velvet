type ChordT = {
    id: string;
    symbol: string;
    rootNote: string;
    bassNote: string
    inversion: number
    octave: number
    voicing: string
    notes: string[]
    startBeats: number;
    endBeats: number;
    duration: number;
    isRest: boolean;
    isSelected: boolean;
}

class ProgressionStore {
    chords = $state<ChordT[]>([])
    length = $state<number>(1)
}