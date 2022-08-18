/**
 * Options available for an {@linkcode Instrument}.
 */
export interface InstrumentOptions {
    /**
     * The name of the instrument.
     */
    "name"?: string,

    /**
     * The sound file of the instrument
     *
     * @remarks
     * Just the file name, not the path).
     */
    "soundFile"?: string,

    /**
     * The key of the sound file.
     *
     * @remarks
     * Just like the note blocks, this ranges from 0-87.
     */
    "key"?: number,

    /**
     * Whether the piano should automatically press keys with this instrument when the marker passes them.
     */
    "pressKey"?: boolean

    /**
     * Whether the instrument is a built-in instrument.
     */
    "builtIn"?: boolean,
}

/**
 * Meta information for an {@linkcode Instrument}.
 */
export interface InstrumentMeta {
    /**
     * The name of the instrument.
     */
    name: string | undefined,

    /**
     * The sound file of the instrument.
     *
     * @remarks
     * Just the file name, not the path.
     */
    soundFile: string | undefined
}

/**
 * Default {@linkcode InstrumentOptions} values.
 */
export const defaultInstrumentOptions: InstrumentOptions = {
    "name": "",
    "soundFile": "",
    "key": 45,
    "pressKey": false,
    "builtIn": false
};

/**
 * Default {@linkcode InstrumentMeta} values.
 */
export const defaultInstrumentMeta: InstrumentMeta = {
    "name": defaultInstrumentOptions.name,
    "soundFile": defaultInstrumentOptions.soundFile
};

/**
 * Represents an instrument of a {@linkcode Note}.
 */
export class Instrument {
    /**
     * The built-in instruments.
     *
     * @remarks
     * Includes harp, double bass, bass drum, snare drum, click, guitar, flute, bell, chime, xylophone, iron xylophone, cow bell, didgeridoo, bit, banjo, and pling.
     */
    public static builtIn = [
        new this(
            0,
            {
                "name": "Harp",
                "soundFile": "harp.ogg",
                "builtIn": true
            }
        ),
        new this(
            1,
            {
                "name": "Double Bass",
                "soundFile": "dbass.ogg",
                "builtIn": true
            }
        ),
        new this(
            2,
            {
                "name": "Bass Drum",
                "soundFile": "bdrum.ogg",
                "builtIn": true
            }
        ),
        new this(
            3,
            {
                "name": "Snare Drum",
                "soundFile": "sdrum.ogg",
                "builtIn": true
            }
        ),
        new this(
            4,
            {
                "name": "Click",
                "soundFile": "click.ogg",
                "builtIn": true
            }
        ),
        new this(
            5,
            {
                "name": "Guitar",
                "soundFile": "guitar.ogg",
                "builtIn": true
            }
        ),
        new this(
            6,
            {
                "name": "Flute",
                "soundFile": "flute.ogg",
                "builtIn": true
            }
        ),
        new this(
            7,
            {
                "name": "Bell",
                "soundFile": "bell.ogg",
                "builtIn": true
            }
        ),
        new this(
            8,
            {
                "name": "Chime",
                "soundFile": "icechime.ogg",
                "builtIn": true
            }
        ),
        new this(
            9,
            {
                "name": "Xylophone",
                "soundFile": "xylobone.ogg",
                "builtIn": true
            }
        ),
        new this(
            10,
            {
                "name": "Iron Xylophone",
                "soundFile": "iron_xylophone.ogg",
                "builtIn": true
            }
        ),
        new this(
            11,
            {
                "name": "Cow Bell",
                "soundFile": "cow_bell.ogg",
                "builtIn": true
            }
        ),
        new this(
            12,
            {
                "name": "Didgeridoo",
                "soundFile": "didgeridoo.ogg",
                "builtIn": true
            }
        ),
        new this(
            13,
            {
                "name": "Bit",
                "soundFile": "bit.ogg",
                "builtIn": true
            }
        ),
        new this(
            14,
            {
                "name": "Banjo",
                "soundFile": "banjo.ogg",
                "builtIn": true
            }
        ),
        new this(
            15,
            {
                "name": "Pling",
                "soundFile": "pling.ogg",
                "builtIn": true
            }
        )
    ];

    /**
     * ID of the instrument.
     *
     * @remarks
     * Used internally for built-in instruments.
     */
    public id: number;

    /**
     * Meta information for the instrument.
     *
     * @see {@linkcode InstrumentMeta}
     */
    public meta = { ...defaultInstrumentMeta };

    /**
     * The key of the sound file.
     *
     * @remarks
     * Just like the note blocks, this ranges from 0-87.
     */
    public key = defaultInstrumentOptions.key;

    /**
     * Whether the piano should automatically press keys with this instrument when the marker passes them.
     */
    public pressKey = defaultInstrumentOptions.pressKey;

    /**
     * Whether the instrument is a built-in instrument.
     */
    public builtIn = defaultInstrumentOptions.builtIn;

    /**
     * Construct an instrument.
     *
     * @param id ID of the instrument in the song's instrument array
     * @param options Options for the instrument
     */
    public constructor(id: number, options: InstrumentOptions = defaultInstrumentOptions) {
        this.id = id;

        // Parse options
        if (options) {
            this.meta.name = options.name ?? defaultInstrumentOptions.name;
            this.meta.soundFile = options.soundFile ?? defaultInstrumentOptions.soundFile;
            this.pressKey = options.pressKey ?? defaultInstrumentOptions.pressKey;
            this.key = options.key ?? defaultInstrumentOptions.key;
            this.builtIn = options.builtIn ?? defaultInstrumentOptions.builtIn;
        }
    }
}
