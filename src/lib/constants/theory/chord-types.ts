export const CHORD_TYPES = [
	{
		"name": "major (no fifth)",
		"aliases": ["major (no fifth)"],
		"intervals": ["1P", "3M"],
		"symbols": ["M(no5)", "maj(no5)"]
	},
	{
		"name": "minor (no fifth)",
		"aliases": ["minor (no fifth)"],
		"intervals": ["1P", "3m"],
		"symbols": ["m(no5)", "min(no5)"]
	},
	{
		"name": "fifth",
		"aliases": ["fifth"],
		"intervals": ["1P", "5P"],
		"symbols": ["5"]
	},
	{
		"name": "major",
		"aliases": ["major"],
		"intervals": ["1P", "3M", "5P"],
		"symbols": ["", "M", "^", "maj"]
	},
	{
		"name": "minor",
		"aliases": ["minor"],
		"intervals": ["1P", "3m", "5P"],
		"symbols": ["-", "m", "min"]
	},
	{
		"name": "augmented",
		"aliases": ["augmented"],
		"intervals": ["1P", "3M", "5A"],
		"symbols": ["+", "+5", "^#5", "aug", "aug5"]
	},
	{
		"name": "diminished",
		"aliases": ["diminished"],
		"intervals": ["1P", "3m", "5d"],
		"symbols": ["°", "dim", "o"]
	},
	{
		"name": "Major Flat Fifth",
		"aliases": ["Major Flat Fifth"],
		"intervals": ["1P", "3M", "5d"],
		"symbols": ["Mb5"]
	},
	{
		"name": "minor augmented",
		"aliases": ["diminished sharp fifth", "minor augmented"],
		"intervals": ["1P", "3m", "5A"],
		"symbols": ["-#5", "°♯5", "dim♯5", "m#5", "m+"]
	},
	{
		"name": "suspended second",
		"aliases": ["suspended second"],
		"intervals": ["1P", "2M", "5P"],
		"symbols": ["sus2"]
	},
	{
		"name": "suspended fourth",
		"aliases": ["suspended fourth"],
		"intervals": ["1P", "4P", "5P"],
		"symbols": ["sus", "sus4"]
	},
	{
		"name": "no fifth",
		"aliases": ["no fifth"],
		"intervals": ["1P", "3M", "7M"],
		"symbols": ["(no5)", "maj7(no5)", "no5"]
	},
	{
		"name": "dominant seventh (no third)",
		"aliases": ["Dominant Seventh No Fifth", "dominant seventh (no third)"],
		"intervals": ["1P", "3M", "7m"],
		"symbols": ["7(no3)", "7no5"]
	},
	{
		"name": "major seventh (no third)",
		"aliases": ["major seventh (no third)"],
		"intervals": ["1P", "5P", "7M"],
		"symbols": ["M7(no3)", "maj7(no3)"]
	},
	{
		"name": "altered",
		"aliases": ["altered"],
		"intervals": ["1P", "3M", "7m", "9m"],
		"symbols": ["alt7"]
	},
	{
		"name": "minor (no fifth) added ninth",
		"aliases": ["minor (no fifth) added ninth"],
		"intervals": ["1P", "3m", "9M"],
		"symbols": ["m(no5)add9", "min(no5)add9"]
	},
	{
		"name": "Dominant Seventh Flat Thirteen",
		"aliases": ["Dominant Seventh Flat Thirteen"],
		"intervals": ["1P", "3M", "7m", "13m"],
		"symbols": ["7b13"]
	},
	{
		"name": "sixth",
		"aliases": ["sixth"],
		"intervals": ["1P", "3M", "5P", "6M"],
		"symbols": ["6", "M6", "add13", "add6"]
	},
	{
		"name": "minor sixth",
		"aliases": ["minor sixth"],
		"intervals": ["1P", "3m", "5P", "6M"],
		"symbols": ["-6", "m6", "min6"]
	},
	{
		"name": "major seventh",
		"aliases": ["major seventh"],
		"intervals": ["1P", "3M", "5P", "7M"],
		"symbols": ["M7", "Maj7", "ma7", "maj7", "Δ", "^7"]
	},
	{
		"name": "dominant seventh",
		"aliases": ["dominant seventh"],
		"intervals": ["1P", "3M", "5P", "7m"],
		"symbols": ["7", "dom"]
	},
	{
		"name": "minor seventh",
		"aliases": ["minor seventh"],
		"intervals": ["1P", "3m", "5P", "7m"],
		"symbols": ["-7", "m7", "mi7", "min7"]
	},
	{
		"name": "minor/major seventh",
		"aliases": ["Minor Major seventh", "minor/major seventh"],
		"intervals": ["1P", "3m", "5P", "7M"],
		"symbols": ["-^7", "-Δ7", "-maj7", "m/M7", "m/ma7", "m/maj7", "mM7", "mMaj7", "mΔ", "minmaj7", "mmaj7"]
	},
	{
		"name": "augmented seventh",
		"aliases": [
			"Augmented Seventh",
			"Augmented dominant seventh",
			"augmented major seventh",
			"augmented seventh",
			"seventh sharp five"
		],
		"intervals": ["1P", "3M", "5A", "7M"],
		"symbols": ["M7♯5", "maj7#5", "maj7+5", "maj7+", "maj7aug", "maj7♯5", "+maj7", "^7#5"]
	},
	{
		"name": "diminished seventh",
		"aliases": ["diminished seventh"],
		"intervals": ["1P", "3m", "5d", "7d"],
		"symbols": ["°7", "dim7", "o7"]
	},
	{
		"name": "half-diminished",
		"aliases": ["half-diminished", "half-diminished seventh", "minor seventh flat five"],
		"intervals": ["1P", "3m", "5d", "7m"],
		"symbols": ["-7b5", "h", "h7", "m7b5", "m7♭5", "min7♭5", "ø", "ø7"]
	},
	{
		"name": "Major Seventh Flat Fifth",
		"aliases": ["Major Seventh Flat Fifth"],
		"intervals": ["1P", "3M", "5d", "7M"],
		"symbols": ["M7b5"]
	},
	{
		"name": "dominant seventh flat fifth",
		"aliases": ["Dominant Seventh Flat Fifth", "dominant seventh flat fifth", "seventh flat fifth"],
		"intervals": ["1P", "3M", "5d", "7m"],
		"symbols": ["7(b5)", "7b5", "7♭5"]
	},
	{
		"name": "dominant seventh sharp fifth",
		"aliases": ["dominant seventh sharp fifth", "seventh sharp fifth"],
		"intervals": ["1P", "3M", "5A", "7m"],
		"symbols": ["7#5", "7+", "7aug", "7♭13", "7♯5", "7(♯5)", "7(#5)", "7+5"]
	},
	{
		"name": "add two",
		"aliases": ["add two"],
		"intervals": ["1P", "2M", "3M", "5P"],
		"symbols": ["(add2)", "add2"]
	},
	{
		"name": "major added ninth",
		"aliases": ["Major Add Ninth", "major added ninth"],
		"intervals": ["1P", "3M", "5P", "9M"],
		"symbols": ["2", "Madd9", "add2", "add9", "majadd9"]
	},
	{
		"name": "added eleventh",
		"aliases": ["added eleventh", "major added eleventh"],
		"intervals": ["1P", "3M", "5P", "11P"],
		"symbols": ["Madd11", "add11", "majadd11"]
	},
	{
		"name": "minor added ninth",
		"aliases": ["minor added ninth"],
		"intervals": ["1P", "3m", "5P", "9M"],
		"symbols": ["madd9", "minadd9"]
	},
	{
		"name": "add flat nine",
		"aliases": ["add flat nine"],
		"intervals": ["1P", "3M", "5P", "9m"],
		"symbols": ["(addb9)", "addb9"]
	},
	{
		"name": "minor add two",
		"aliases": ["minor add two"],
		"intervals": ["1P", "2M", "3m", "5P"],
		"symbols": ["m(add2)", "madd2"]
	},
	{
		"name": "minor added eleventh",
		"aliases": ["minor added eleventh"],
		"intervals": ["1P", "3m", "5P", "11P"],
		"symbols": ["madd11", "minadd11"]
	},
	{
		"name": "add sharp eleven",
		"aliases": ["add sharp eleven"],
		"intervals": ["1P", "3M", "5P", "11A"],
		"symbols": ["(add#11)", "add#11"]
	},
	{
		"name": "minor add flat nine",
		"aliases": ["minor add flat nine"],
		"intervals": ["1P", "3m", "5P", "9m"],
		"symbols": ["m(addb2)", "m(addb9)", "maddb9"]
	},
	{
		"name": "minor add sharp eleven",
		"aliases": ["minor add sharp eleven"],
		"intervals": ["1P", "3m", "5P", "11A"],
		"symbols": ["m(add#11)", "m(add#4)", "madd#11"]
	},
	{
		"name": "major seventh flat sixth",
		"aliases": ["major seventh flat sixth"],
		"intervals": ["1P", "3M", "6m", "7M"],
		"symbols": ["M7b6", "^7b6"]
	},
	{
		"name": "Minor Flat Sixth Major Seventh",
		"aliases": ["Minor Flat Sixth Major Seventh"],
		"intervals": ["1P", "3m", "6m", "7M"],
		"symbols": ["mb6M7"]
	},
	{
		"name": "Minor Seventh Sharp Fifth",
		"aliases": ["Minor Seventh Sharp Fifth"],
		"intervals": ["1P", "3m", "6m", "7m"],
		"symbols": ["m7#5"]
	},
	{
		"name": "Diminished Major Seventh",
		"aliases": ["Diminished Major Seventh"],
		"intervals": ["1P", "3m", "5d", "7M"],
		"symbols": ["oM7"]
	},
	{
		"name": "diminished flat ninth",
		"aliases": ["diminished flat ninth"],
		"intervals": ["1P", "3m", "5d", "9m"],
		"symbols": ["°♭9", "dim♭9"]
	},
	{
		"name": "major added thirteenth",
		"aliases": ["major added thirteenth"],
		"intervals": ["1P", "3M", "5P", "13M"],
		"symbols": ["Madd13", "majadd13"]
	},
	{
		"name": "dominant seventh suspended second",
		"aliases": ["dominant seventh suspended second"],
		"intervals": ["1P", "2M", "5P", "7m"],
		"symbols": ["7sus2"]
	},
	{
		"name": "major seventh suspended second",
		"aliases": ["major seventh suspended second"],
		"intervals": ["1P", "2M", "5P", "7M"],
		"symbols": ["maj7sus2"]
	},
	{
		"name": "sixth suspended second",
		"aliases": ["sixth suspended second"],
		"intervals": ["1P", "2M", "5P", "6M"],
		"symbols": ["6sus2"]
	},
	{
		"name": "suspended fourth seventh",
		"aliases": ["Dominant seventh suspended fourth", "seventh suspended fourth", "suspended fourth seventh"],
		"intervals": ["1P", "4P", "5P", "7m"],
		"symbols": ["7sus", "7sus4", "m7sus", "m7sus4"]
	},
	{
		"name": "Major Seventh Suspended Fourth",
		"aliases": ["major seventh suspended fourth"],
		"intervals": ["1P", "4P", "5P", "7M"],
		"symbols": ["M7sus4", "maj7sus4"]
	},
	{
		"name": "sixth suspended fourth",
		"aliases": ["sixth suspended fourth"],
		"intervals": ["1P", "4P", "5P", "6M"],
		"symbols": ["6sus4"]
	},
	{
		"name": "Augmented Seventh Suspended Fourth",
		"aliases": ["Augmented Seventh Suspended Fourth"],
		"intervals": ["1P", "4P", "5A", "7m"],
		"symbols": ["7#5sus4"]
	},
	{
		"name": "Augmented Major Seventh Suspended Fourth",
		"aliases": ["Augmented Major Seventh Suspended Fourth"],
		"intervals": ["1P", "4P", "5A", "7M"],
		"symbols": ["M7#5sus4"]
	},
	{
		"name": "Suspended Fourth Add Ninth",
		"aliases": ["Suspended Fourth Add Ninth"],
		"intervals": ["1P", "2M", "4P", "5P"],
		"symbols": ["sus24", "sus4add9"]
	},
	{
		"name": "Quartal",
		"aliases": ["Quartal"],
		"intervals": ["1P", "4P", "7m", "10m"],
		"symbols": ["4", "quartal"]
	},
	{
		"name": "Minor Add Fourth",
		"aliases": ["Minor Add Fourth"],
		"intervals": ["1P", "3m", "4P", "5P"],
		"symbols": ["madd4"]
	},
	{
		"name": "dominant ninth",
		"aliases": ["Dominant Ninth No Fifth", "dominant ninth"],
		"intervals": ["1P", "3M", "7m", "9M"],
		"symbols": ["9", "9no5"]
	},
	{
		"name": "minor added thirteenth",
		"aliases": ["minor added thirteenth"],
		"intervals": ["1P", "3m", "5P", "13M"],
		"symbols": ["madd13", "minadd13"]
	},
	{
		"name": "dominant sharp ninth",
		"aliases": ["dominant seventh sharp ninth", "dominant sharp ninth", "seventh add sharp ninth", "seventh sharp nine"],
		"intervals": ["1P", "3M", "5P", "7m", "9A"],
		"symbols": ["7(#9)", "7#9", "7add#9", "7♯9", "7(♯9)"]
	},
	{
		"name": "major ninth",
		"aliases": ["major ninth"],
		"intervals": ["1P", "3M", "5P", "7M", "9M"],
		"symbols": ["M9", "maj9", "Δ9", "^9", "maj7(9)", "M7(9)", "Amaj7(9)"]
	},
	{
		"name": "dominant ninth",
		"aliases": ["dominant ninth", "seventh add ninth"],
		"intervals": ["1P", "3M", "5P", "7m", "9M"],
		"symbols": ["7(9)", "7add9", "9"]
	},
	{
		"name": "minor ninth",
		"aliases": ["minor ninth", "minor seventh add nine"],
		"intervals": ["1P", "3m", "5P", "7m", "9M"],
		"symbols": ["-9", "m7(9)", "m7(add9)", "m9", "min7(add9)", "min9"]
	},
	{
		"name": "dominant flat ninth",
		"aliases": ["dominant flat ninth", "seventh add flat ninth", "seventh flat nine"],
		"intervals": ["1P", "3M", "5P", "7m", "9m"],
		"symbols": ["7(b9)", "7addb9", "7b9", "7♭9", "7(♭9)"]
	},
	{
		"name": "minor/major ninth",
		"aliases": ["minor/major ninth"],
		"intervals": ["1P", "3m", "5P", "7M", "9M"],
		"symbols": ["-^9", "mM9", "mMaj9", "mMaj7(9)", "m/maj7(9)"]
	},
	{
		"name": "minor seventh flat nine",
		"aliases": ["minor seventh flat nine"],
		"intervals": ["1P", "3m", "5P", "7m", "9m"],
		"symbols": ["m7♭9", "min7♭9"]
	},
	{
		"name": "major seventh sharp eleventh",
		"aliases": ["lydian dominant seventh", "major seventh sharp eleventh", "seventh sharp eleven"],
		"intervals": ["1P", "3M", "5P", "7M", "11A"],
		"symbols": ["M7#11", "M7♯11", "maj#4", "maj7#11", "maj7♯11", "Δ#11", "Δ#4", "^7#11"]
	},
	{
		"name": "dominant seventh sharp eleventh",
		"aliases": ["dominant seventh sharp eleventh", "seventh add sharp eleventh", "seventh sharp eleven"],
		"intervals": ["1P", "3M", "5P", "7m", "11A"],
		"symbols": ["7(#11)", "7#11", "7#4", "7add#11", "7♯11", "Lydian dominant"]
	},
	{
		"name": "seventh add eleven",
		"aliases": ["seventh add eleven", "seventh add eleventh"],
		"intervals": ["1P", "3M", "5P", "7m", "11P"],
		"symbols": ["7(11)", "7add11", "m7(11)"]
	},
	{
		"name": "Minor Seventh Add Eleventh",
		"aliases": ["Minor Seventh Add Eleventh"],
		"intervals": ["1P", "3m", "5P", "7m", "11P"],
		"symbols": ["m7add11", "m7add4"]
	},
	{
		"name": "seventh add flat eleventh",
		"aliases": ["seventh add flat eleventh"],
		"intervals": ["1P", "3M", "5P", "7m", "11d"],
		"symbols": ["7(b11)", "7addb11"]
	},
	{
		"name": "suspended fourth flat ninth",
		"aliases": ["suspended fourth flat ninth"],
		"intervals": ["1P", "4P", "5P", "7m", "9m"],
		"symbols": ["7b9sus", "7b9sus4", "b9sus", "phryg"]
	},
	{
		"name": "dominant ninth suspended fourth",
		"aliases": ["Ninth Suspended Fourth", "dominant ninth suspended fourth"],
		"intervals": ["1P", "4P", "5P", "7m", "9M"],
		"symbols": ["9sus", "9sus4"]
	},
	{
		"name": "half-diminished ninth",
		"aliases": ["half-diminished ninth"],
		"intervals": ["1P", "3m", "5d", "7m", "9M"],
		"symbols": ["m9♭5", "min9♭5", "ø9"]
	},
	{
		"name": "minor seventh flat five flat ninth",
		"aliases": ["minor seventh flat five flat ninth"],
		"intervals": ["1P", "3m", "5d", "7m", "9m"],
		"symbols": ["m7♭5♭9", "min7♭5♭9"]
	},
	{
		"name": "Dominant Seventh Flat Fifth Flat Ninth",
		"aliases": ["Dominant Seventh Flat Fifth Flat Ninth", "dominant seventh flat fifth flat ninth"],
		"intervals": ["1P", "3M", "5d", "7m", "9m"],
		"symbols": ["7♭5♭9"]
	},
	{
		"name": "Dominant Seventh Flat Fifth Sharp Ninth",
		"aliases": ["Dominant Seventh Flat Fifth Sharp Ninth", "dominant seventh flat fifth sharp ninth"],
		"intervals": ["1P", "3M", "5d", "7m", "9A"],
		"symbols": ["7♭5♯9"]
	},
	{
		"name": "dominant ninth flat fifth",
		"aliases": ["Dominant Ninth Flat Fifth", "dominant ninth flat fifth", "ninth flat fifth"],
		"intervals": ["1P", "3M", "5d", "7m", "9M"],
		"symbols": ["9b5", "9♭5"]
	},
	{
		"name": "Major Ninth Flat Fifth",
		"aliases": ["Major Ninth Flat Fifth"],
		"intervals": ["1P", "3M", "5d", "7M", "9M"],
		"symbols": ["M9b5"]
	},
	{
		"name": "dominant seventh sharp fifth flat ninth",
		"aliases": ["dominant seventh sharp fifth flat ninth"],
		"intervals": ["1P", "3M", "5A", "7m", "9m"],
		"symbols": ["7♯5♭9"]
	},
	{
		"name": "dominant seventh sharp fifth sharp ninth",
		"aliases": ["Augmented Seventh Sharp Ninth", "dominant seventh sharp fifth sharp ninth"],
		"intervals": ["1P", "3M", "5A", "7m", "9A"],
		"symbols": ["7#5#9", "7#9#5", "7alt", "7♯5♯9"]
	},
	{
		"name": "dominant ninth sharp fifth",
		"aliases": ["Dominant Ninth Augmented Fifth", "augmented ninth", "dominant ninth sharp fifth", "ninth sharp fifth"],
		"intervals": ["1P", "3M", "5A", "7m", "9M"],
		"symbols": ["9#5", "9+", "9aug", "9♯5"]
	},
	{
		"name": "Major Ninth Augmented Fifth",
		"aliases": ["Major Ninth Augmented Fifth", "augmented major ninth"],
		"intervals": ["1P", "3M", "5A", "7M", "9M"],
		"symbols": ["Maj9#5", "maj9#5", "maj9♯5"]
	},
	{
		"name": "eleventh",
		"aliases": ["eleventh"],
		"intervals": ["1P", "5P", "7m", "9M", "11P"],
		"symbols": ["11"]
	},
	{
		"name": "major sixth add ninth",
		"aliases": ["major sixth add ninth", "sixth added ninth"],
		"intervals": ["1P", "3M", "5P", "6M", "9M"],
		"symbols": ["6/9", "69", "6add9", "M69"]
	},
	{
		"name": "minor sixth ninth",
		"aliases": ["minor sixth add ninth", "minor sixth ninth"],
		"intervals": ["1P", "3m", "5P", "6M", "9M"],
		"symbols": ["m69", "m6add9", "m6/9", "min69", "min6add9"]
	},
	{
		"name": "Major Sixth Sharp Eleventh",
		"aliases": ["Major Sixth Sharp Eleventh"],
		"intervals": ["1P", "3M", "5P", "6M", "11A"],
		"symbols": ["6#11", "6b5", "M6#11", "M6b5"]
	},
	{
		"name": "diminished flat ninth eleventh",
		"aliases": ["diminished flat ninth eleventh"],
		"intervals": ["1P", "3m", "5d", "9m", "11P"],
		"symbols": ["°♭9add11", "dim♭9add11"]
	},
	{
		"name": "minor added ninth and eleventh",
		"aliases": ["minor added ninth and eleventh"],
		"intervals": ["1P", "3m", "5P", "9M", "11P"],
		"symbols": ["madd9add11", "minadd9add11"]
	},
	{
		"name": "minor sixth eleventh",
		"aliases": ["minor sixth eleventh"],
		"intervals": ["1P", "3m", "5P", "6M", "11P"],
		"symbols": ["m6add11", "min6add11"]
	},
	{
		"name": "major ninth suspended fourth",
		"aliases": ["Major Ninth Suspended Fourth", "major ninth suspended fourth"],
		"intervals": ["1P", "4P", "5P", "7M", "9M"],
		"symbols": ["M9sus4", "maj9sus4"]
	},
	{
		"name": "Dominant Seventh Flat Sixth",
		"aliases": ["Dominant Seventh Flat Sixth"],
		"intervals": ["1P", "3M", "5P", "6m", "7m"],
		"symbols": ["7b6"]
	},
	{
		"name": "major seventh suspended second thirteenth",
		"aliases": ["major seventh suspended second thirteenth"],
		"intervals": ["1P", "2M", "5P", "7M", "13M"],
		"symbols": ["maj7sus2add13"]
	},
	{
		"name": "Diminished Seventh Major Seventh",
		"aliases": ["Diminished Seventh Major Seventh"],
		"intervals": ["1P", "3m", "5d", "6M", "7M"],
		"symbols": ["o7M7"]
	},
	{
		"name": "Minor Major Seventh Flat Sixth",
		"aliases": ["Minor Major Seventh Flat Sixth"],
		"intervals": ["1P", "3m", "5P", "6m", "7M"],
		"symbols": ["mMaj7b6"]
	},
	{
		"name": "dominant thirteenth",
		"aliases": ["Dominant Seventh Add Sixth", "dominant thirteenth", "seventh add thirteen"],
		"intervals": ["1P", "3M", "5P", "7m", "13M"],
		"symbols": ["13", "67", "7(13)", "7add13", "7add6", "m7(13)"]
	},
	{
		"name": "major thirteenth",
		"aliases": ["major thirteenth"],
		"intervals": ["1P", "3M", "5P", "7M", "9M", "13M"],
		"symbols": ["M13", "Maj13", "maj13", "^13"]
	},
	{
		"name": "dominant thirteenth",
		"aliases": ["Dominant Thirteenth No Fifth", "dominant thirteenth"],
		"intervals": ["1P", "3M", "7m", "9M", "13M"],
		"symbols": ["13", "13no5"]
	},
	{
		"name": "minor thirteenth",
		"aliases": ["minor thirteenth"],
		"intervals": ["1P", "3m", "5P", "7m", "9M", "13M"],
		"symbols": ["-13", "m13", "min13"]
	},
	{
		"name": "minor eleventh",
		"aliases": ["minor eleventh"],
		"intervals": ["1P", "3m", "5P", "7m", "9M", "11P"],
		"symbols": ["-11", "m11", "min11"]
	},
	{
		"name": "major eleventh",
		"aliases": ["major eleventh"],
		"intervals": ["1P", "3M", "5P", "7M", "9M", "11P"],
		"symbols": ["maj11"]
	},
	{
		"name": "major sharp eleventh (lydian)",
		"aliases": ["major sharp eleventh (lydian)"],
		"intervals": ["1P", "3M", "5P", "7M", "9M", "11A"],
		"symbols": ["maj9#11", "Δ9#11", "^9#11"]
	},
	{
		"name": "dominant seventh flat nine flat thirteenth",
		"aliases": ["dominant seventh flat nine flat thirteenth"],
		"intervals": ["1P", "3M", "5P", "7m", "9m", "13m"],
		"symbols": ["7♭9♭13"]
	},
	{
		"name": "dominant ninth flat thirteenth",
		"aliases": ["Dominant Ninth Flat Thirteen", "dominant ninth flat thirteenth", "seventh add flat thirteenth"],
		"intervals": ["1P", "3M", "5P", "7m", "9M", "13m"],
		"symbols": ["7(b13)", "7addb13", "7b13", "9b13", "9♭13"]
	},
	{
		"name": "dominant thirteenth flat ninth",
		"aliases": ["dominant thirteenth flat ninth"],
		"intervals": ["1P", "3M", "5P", "7m", "9m", "13M"],
		"symbols": ["13♭9"]
	},
	{
		"name": "dominant thirteenth sharp ninth",
		"aliases": ["Dominant Thirteen Sharp Ninth", "dominant thirteenth sharp ninth"],
		"intervals": ["1P", "3M", "5P", "7m", "9A", "13M"],
		"symbols": ["13#9", "13♯9"]
	},
	{
		"name": "dominant seventh sharp ninth flat thirteenth",
		"aliases": ["dominant seventh sharp ninth flat thirteenth"],
		"intervals": ["1P", "3M", "5P", "7m", "9A", "13m"],
		"symbols": ["7#9b13", "7♯9♭13"]
	},
	{
		"name": "dominant seventh flat nine sharp thirteenth",
		"aliases": ["dominant seventh flat nine sharp thirteenth"],
		"intervals": ["1P", "3M", "5P", "7m", "9m", "13A"],
		"symbols": ["7♭9♯13"]
	},
	{
		"name": "dominant seventh sharp ninth sharp thirteenth",
		"aliases": ["dominant seventh sharp ninth sharp thirteenth"],
		"intervals": ["1P", "3M", "5P", "7m", "9A", "13A"],
		"symbols": ["7♯9♯13"]
	},
	{
		"name": "dominant ninth sharp thirteenth",
		"aliases": ["dominant ninth sharp thirteenth"],
		"intervals": ["1P", "3M", "5P", "7m", "9M", "13A"],
		"symbols": ["9♯13"]
	},
	{
		"name": "dominant ninth sharp eleventh",
		"aliases": ["Dominant Ninth Sharp Eleventh", "dominant ninth sharp eleventh"],
		"intervals": ["1P", "3M", "5P", "7m", "9M", "11A"],
		"symbols": ["9#11", "9#4", "9+4", "9♯11"]
	},
	{
		"name": "minor eleventh flat nine",
		"aliases": ["minor eleventh flat nine"],
		"intervals": ["1P", "3m", "5P", "7m", "9m", "11P"],
		"symbols": ["m11♭9", "min11♭9"]
	},
	{
		"name": "half-diminished eleventh",
		"aliases": ["half-diminished eleventh"],
		"intervals": ["1P", "3m", "5d", "7m", "9M", "11P"],
		"symbols": ["m11♭5", "min11♭5", "ø11"]
	},
	{
		"name": "minor eleventh flat five flat ninth",
		"aliases": ["minor eleventh flat five flat ninth"],
		"intervals": ["1P", "3m", "5d", "7m", "9m", "11P"],
		"symbols": ["m11♭5♭9", "min11♭5♭9"]
	},
	{
		"name": "eleventh flat fifth",
		"aliases": ["eleventh flat fifth"],
		"intervals": ["1P", "3M", "5d", "7m", "9M", "11P"],
		"symbols": ["11♭5"]
	},
	{
		"name": "dominant thirteenth flat fifth",
		"aliases": ["Dominant Thirteenth Flat Fifth", "dominant thirteenth flat fifth", "thirteenth flat fifth"],
		"intervals": ["1P", "3M", "5d", "7m", "9M", "13M"],
		"symbols": ["13b5", "13♭5"]
	},
	{
		"name": "half-diminished thirteenth",
		"aliases": ["half-diminished thirteenth"],
		"intervals": ["1P", "3m", "5d", "7m", "9M", "13M"],
		"symbols": ["m13♭5", "min13♭5", "ø13"]
	},
	{
		"name": "augmented eleventh",
		"aliases": ["augmented eleventh", "eleventh sharp fifth"],
		"intervals": ["1P", "3M", "5A", "7m", "9M", "11P"],
		"symbols": ["11#5", "11+", "11aug", "11♯5"]
	},
	{
		"name": "dominant thirteenth sharp fifth",
		"aliases": ["augmented thirteenth", "dominant thirteenth sharp fifth", "thirteenth sharp fifth"],
		"intervals": ["1P", "3M", "5A", "7m", "9M", "13M"],
		"symbols": ["13#5", "13+", "13aug", "13♯5"]
	},
	{
		"name": "Major Seventh Add Thirteenth",
		"aliases": ["Major Seventh Add Thirteenth"],
		"intervals": ["1P", "3M", "5P", "6M", "7M", "9M"],
		"symbols": ["M7add13"]
	},
	{
		"name": "minor thirteenth suspended fourth",
		"aliases": ["minor thirteenth suspended fourth"],
		"intervals": ["1P", "4P", "5P", "7m", "9M", "13M"],
		"symbols": ["m13sus4", "min13sus4"]
	},
	{
		"name": "dominant thirteenth suspended fourth",
		"aliases": ["Thirteenth Suspended Fourth", "dominant thirteenth suspended fourth"],
		"intervals": ["1P", "4P", "5P", "7m", "9M", "13M"],
		"symbols": ["13sus", "13sus4"]
	},
	{
		"name": "augmented major eleventh",
		"aliases": ["augmented major eleventh"],
		"intervals": ["1P", "3M", "5A", "7M", "9M", "11P"],
		"symbols": ["maj11♯5"]
	},
	{
		"name": "augmented major thirteenth",
		"aliases": ["augmented major thirteenth"],
		"intervals": ["1P", "3M", "5A", "7M", "9M", "13M"],
		"symbols": ["maj13♯5"]
	},
	{
		"name": "Augmented Major Ninth Suspended Fourth",
		"aliases": ["Augmented Major Ninth Suspended Fourth"],
		"intervals": ["1P", "4P", "5A", "7M", "9M"],
		"symbols": ["M9#5sus4"]
	},
	{
		"name": "Dominant Seventh Sharp Eleventh Flat Thirteen",
		"aliases": ["Dominant Seventh Sharp Eleventh Flat Thirteen"],
		"intervals": ["1P", "3M", "5P", "7m", "11A", "13m"],
		"symbols": ["7#11b13", "7b5b13"]
	},
	{
		"name": "Dominant Ninth Augmented Fifth Sharp Eleventh",
		"aliases": ["Dominant Ninth Augmented Fifth Sharp Eleventh"],
		"intervals": ["1P", "3M", "5A", "7m", "9M", "11A"],
		"symbols": ["9#5#11"]
	},
	{
		"name": "Major Seventh Sharp Ninth Sharp Eleventh",
		"aliases": ["Major Seventh Sharp Ninth Sharp Eleventh"],
		"intervals": ["1P", "3M", "5P", "7M", "9A", "11A"],
		"symbols": ["maj7#9#11"]
	},
	{
		"name": "dominant thirteenth sharp eleventh",
		"aliases": ["dominant thirteenth sharp eleventh"],
		"intervals": ["1P", "3M", "5P", "7m", "9M", "11A", "13M"],
		"symbols": ["13♯11"]
	},
	{
		"name": "Dominant Seventh Sharp Ninth Sharp Eleventh",
		"aliases": ["Dominant Seventh Sharp Ninth Sharp Eleventh"],
		"intervals": ["1P", "3M", "5P", "7m", "9A", "11A"],
		"symbols": ["7#9#11", "7#9b5", "7b5#9"]
	},
	{
		"name": "diminished flat ninth eleventh flat thirteenth",
		"aliases": ["diminished flat ninth eleventh flat thirteenth"],
		"intervals": ["1P", "3m", "5d", "9m", "11P", "13m"],
		"symbols": ["°♭9add11♭13", "dim♭9add11♭13"]
	},
	{
		"name": "minor eleventh flat thirteenth",
		"aliases": ["minor eleventh flat thirteenth"],
		"intervals": ["1P", "3m", "5P", "7m", "9M", "11P", "13m"],
		"symbols": ["m11♭13", "min11♭13"]
	},
	{
		"name": "dominant thirteenth flat ninth flat thirteenth",
		"aliases": ["dominant thirteenth flat ninth flat thirteenth"],
		"intervals": ["1P", "3M", "5P", "7m", "9m", "13m"],
		"symbols": ["13♭9♭13"]
	},
	{
		"name": "dominant thirteenth sharp ninth flat thirteenth",
		"aliases": ["dominant thirteenth sharp ninth flat thirteenth"],
		"intervals": ["1P", "3M", "5P", "7m", "9A", "13m"],
		"symbols": ["13♯9♭13"]
	},
	{
		"name": "dominant thirteenth flat ninth sharp eleventh",
		"aliases": ["dominant thirteenth flat ninth sharp eleventh"],
		"intervals": ["1P", "3M", "5P", "7m", "9m", "11A", "13M"],
		"symbols": ["13♭9♯11"]
	},
	{
		"name": "minor eleventh flat nine flat thirteenth",
		"aliases": ["minor eleventh flat nine flat thirteenth"],
		"intervals": ["1P", "3m", "5P", "7m", "9m", "11P", "13m"],
		"symbols": ["m11♭9♭13", "min11♭9♭13"]
	},
	{
		"name": "Dominant Thirteen Sharp Ninth Sharp Eleventh",
		"aliases": ["Dominant Thirteen Sharp Ninth Sharp Eleventh"],
		"intervals": ["1P", "3M", "5P", "7m", "9A", "11A", "13M"],
		"symbols": ["13#9#11"]
	},
	{
		"name": "Dominant Seventh Sharp Ninth Sharp Eleventh Flat Thirteen",
		"aliases": ["Dominant Seventh Sharp Ninth Sharp Eleventh Flat Thirteen"],
		"intervals": ["1P", "3M", "5P", "7m", "9A", "11A", "13m"],
		"symbols": ["7#9#11b13"]
	},
	{
		"name": "Minor Major Seventh add 11",
		"aliases": ["minor/major eleventh"],
		"intervals": ["1P", "3m", "5P", "7M", "11P"],
		"symbols": ["mMaj7(11)", "mM11", "m/maj7(11)", "-^11"]
	},
	{
		"name": "Minor Major Seventh add 13",
		"aliases": ["minor/major seventh add thirteen"],
		"intervals": ["1P", "3m", "5P", "7M", "13M"],
		"symbols": ["mMaj7(13)", "m/maj7(add13)", "-^7(add13)"]
	},
	{
		"name": "Major Seventh add 11",
		"aliases": ["major seventh add eleven"],
		"intervals": ["1P", "3M", "5P", "7M", "11P"],
		"symbols": ["maj7(11)", "M7(add11)", "^7(add11)"]
	},
	{
		"name": "Major Seventh add 13",
		"aliases": ["major seventh add thirteen"],
		"intervals": ["1P", "3M", "5P", "7M", "13M"],
		"symbols": ["maj7(13)", "M7(add13)", "^7(add13)"]
	},
	{
		"name": "Seventh Flat Thirteen",
		"aliases": ["dominant seventh flat thirteen", "seventh add flat thirteenth"],
		"intervals": ["1P", "3M", "5P", "7m", "13m"],
		"symbols": ["7b13", "7(b13)", "7(♭13)"]
	}
]