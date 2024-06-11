/**
 * Options available for a {@linkcode Note}.
 *
 * @category Note
 */
export interface NoteOptions {
    /**
     * {@inheritDoc Note#key}
     */
    "key"?: number;
    /**
     * {@inheritDoc Note#velocity}
     */
    "velocity"?: number;
    /**
     * {@inheritDoc Note#panning}
     */
    "panning"?: number;
    /**
     * {@inheritDoc Note#pitch}
     */
    "pitch"?: number;
}
/**
 * Default {@linkcode NoteOptions} values.
 *
 * @category Note
 * @internal
 */
export declare const defaultNoteOptions: Required<NoteOptions>;
/**
 * Represents a note.
 *
 * @includeExample ./examples/design/note.ts
 * @category Highlights
 * @category Note
 */
export declare class Note {
    /**
     * Instrument ID of the note.
     */
    instrument: number;
    /**
     * Key of the note block.
     *
     * @remarks From 0-87. 33-57 is within the 2-octave limit.
     * @example 0 is A0 and 87 is C8.
     */
    key: number;
    /**
     * Velocity (volume) of the note block.
     *
     * @remarks From 0% to 100%.
     */
    velocity: number;
    /**
     * Stereo position of the note block.
     *
     * @remarks From -100 to 100.
     * @example 0 means center panning.
     */
    panning: number;
    /**
     * Fine pitch of the note block.
     *
     * @remarks The max in Note Block Studio is limited to -1200 and +1200.
     * @example 0 designates no fine-tuning. ±100 cents is a single semitone difference.
     */
    pitch: number;
    /**
     * Construct a note.
     *
     * @param instrument Instrument ID for the note
     * @param options Options for the note
     */
    constructor(instrument: number, options?: NoteOptions);
}
