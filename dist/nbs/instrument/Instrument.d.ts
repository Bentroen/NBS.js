/**
 * Structure of {@linkcode builtInBuilder}.
 *
 * @category Instrument
 * @internal
 */
export interface BuiltInBuilder {
    /**
     * ID-instrument pair.
     */
    [id: number]: {
        /**
         * {@inheritDoc Instrument#name}
         */
        "name": string;
        /**
         * {@inheritDoc Instrument#soundFile}
         */
        "soundFile": string;
    };
}
/**
 * Used to construct {@linkcode Instrument.builtIn}.
 *
 * @satisfies {BuiltInBuilder}
 * @category Instrument
 * @internal
 */
export declare const builtInBuilder: BuiltInBuilder;
/**
 * Every built-in instrument.
 *
 * @see {@linkcode Instrument.builtIn}
 * @category Instrument
 */
export type BuiltIn = {
    [id in keyof typeof builtInBuilder]: Instrument;
};
/**
 * Options available for an {@linkcode Instrument}.
 *
 * @category Instrument
 */
export interface InstrumentOptions {
    /**
     * {@inheritDoc Instrument#name}
     */
    "name"?: string;
    /**
     * {@inheritDoc Instrument#soundFile}
     */
    "soundFile"?: string;
    /**
     * {@inheritDoc Instrument#key}
     */
    "key"?: number;
    /**
     * {@inheritDoc Instrument#pressKey}
     */
    "pressKey"?: boolean;
}
/**
 * Default {@linkcode Instrument} values.
 *
 * @category Instrument
 */
export declare const defaultInstrumentOptions: InstrumentOptions;
/**
 * Represents an instrument of a {@linkcode Note}.
 *
 * @includeExample ./examples/design/instrument.ts
 * @category Highlights
 * @category Instrument
 */
export declare class Instrument {
    #private;
    /**
     * Instruments built into ONBS.
     */
    static get builtIn(): BuiltIn;
    /**
     * Name of the instrument.
     */
    name?: string;
    /**
     * Sound file of the instrument.
     *
     * @remarks Relative to the `Data/Sounds/` directory of the ONBS installations.
     */
    soundFile: string;
    /**
     * Key of the sound file.
     *
     * @remarks Just like note blocks, this ranges from 0-87.
     *
     * @see {@linkcode Note#key}
     */
    key: number;
    /**
     * Whether the on-screen piano should visually press keys when these notes are played.
     */
    pressKey: boolean;
    /**
     * Whether the instrument is a built-in instrument.
     */
    get isBuiltIn(): boolean;
    /**
     * Construct an instrument.
     *
     * @param options Options for the instrument
     */
    constructor(options?: InstrumentOptions);
}
