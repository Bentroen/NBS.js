import type { BuiltIn, InstrumentOptions } from "./Instrument";
import { Instrument } from "./Instrument";
/**
 * The existing {@linkcode Instrument}s.
 *
 * @see {@linkcode SongInstruments#get}
 * @category Song
 * @category Instrument
 */
export interface ExistingInstruments extends BuiltIn {
    /**
     * ID-Instrument pair.
     *
     * @see {@linkcode Instrument}
     */
    [id: number]: Instrument;
}
/**
 * Represents the {@linkcode Instrument}s of a {@linkcode Song} and provides helper functions.
 *
 * @category Instrument
 */
export declare class SongInstruments {
    #private;
    /**
     * Total number of instruments.
     */
    get total(): number;
    /**
     * Existing instruments.
     */
    get get(): ExistingInstruments;
    /**
     * The ID of the first custom instrument.
     */
    get firstCustomIndex(): number;
    /**
     * Set an existing {@linkcode Instrument} at an ID.
     *
     * @remarks Any existing instrument with the same ID as the added instrument will be overwritten.
     * @see Built-in instruments cannot be modified!
     * @param id ID of the instrument to be set
     */
    set(id: number, instrument: Instrument): Instrument;
    /**
     * Add an existing {@linkcode Instrument}.
     *
     * @param instrument Instrument to add
     */
    add(instrument: Instrument): Instrument;
    /**
     * Create and add an {@linkcode Instrument}.
     *
     * @param options Options for the instrument
     */
    create(options: InstrumentOptions): Instrument;
    /**
     * Delete an {@linkcode Instrument}.
     *
     * @see Built-in instruments cannot be delted!
     * @param id ID of the instrument to be deleted
     */
    delete(id: number): void;
    /**
     * Iterate each id-instrument pair.
     */
    [Symbol.iterator](): Iterable<[number, Instrument]>;
}
