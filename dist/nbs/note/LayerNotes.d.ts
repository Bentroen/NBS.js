import type { NoteOptions } from "./Note";
import { Note } from "./Note";
/**
 * The existing {@linkcode Note}s of the layer.
 *
 * @see {@linkcode LayerNotes#get}
 * @category Layer
 * @category Note
 */
export interface ExistingNotes {
    /**
     * Each tick-note pair.
     *
     * @see {@linkcode Note}
     */
    [tick: number]: Note;
}
/**
 * Represents the {@linkcode Note}s of a {@linkcode Layer} and provides helper functions.
 *
 * @includeExample ./examples/full/iterateNotes.ts
 * @category Layer
 * @category Note
 */
export declare class LayerNotes {
    #private;
    /**
     * Total number of notes within the {@linkcode Layer}.
     */
    get total(): number;
    /**
     * Array of ticks that contain notes within the {@linkcode Layer}.
     */
    get ticks(): number[];
    /**
     * Existing notes.
     */
    get get(): ExistingNotes;
    /**
     * Set an existing {@linkcode Note} at a tick.
     *
     * @remarks Any existing note at the same tick as the added note will be overwritten.
     * @param tick Tick to set the note on
     * @param note Note to set on tick
     */
    set(tick: number, note: Note): Note;
    /**
     * Create and add a {@linkcode Note} to a tick.
     *
     * @param tick Tick to set the note at
     * @param note The note to add
     */
    add(tick: number, note: Note): Note;
    /**
     * Create and add a {@linkcode Note} to a tick.
     *
     * @param tick Tick to set the note at
     * @param instrument The note's instrument
     * @param options Options for the note
     */
    create(tick: number, instrument: number, options?: NoteOptions): Note;
    /**
     * Delete a {@linkcode Note} at a tick.
     *
     * @param tick Tick to remove note from
     */
    delete(tick: number): void;
    /**
     * Iterate each tick-note pair.
     */
    [Symbol.iterator](): Iterator<[number, Note]>;
}
