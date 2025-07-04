const state = $state({
    route: 'instrument',
    midiDeviceId: '',
    instrumentName: '',
    instruments: {},
    midiDevices: [],
    volume: 0.5,
    isMidiReady: false,
    isMidiConnected: false,
    isMidiOutputEnabled: false,
    isInstrumentReady: false,
    isInstrumentLoading: false,
})

export const outputStore = {
    state,
}