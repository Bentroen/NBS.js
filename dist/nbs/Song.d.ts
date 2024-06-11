import { SongLayers } from "./layer/SongLayers";
import { SongInstruments } from "./instrument/SongInstruments";
/**
 * Options available for {@linkcode Song#autoSave}.
 *
 * @category Song
 */
export interface SongAutoSave {
    /**
     * Whether auto-saving has been enabled.
     */
    "enabled": boolean;
    /**
     * Number of minutes between each auto-save.
     *
     * @remarks Ranges from 1 to 60.
     */
    "interval": number;
}
/**
 * Options available for {@linkcode Song#loop}.
 *
 * @category Song
 */
export interface SongLoop {
    /**
     * Whether looping is enabled.
     */
    "enabled": boolean;
    /**
     * Where the song should loop back to.
     *
     * @remarks Unit is ticks.
     */
    "startTick": number;
    /**
     * Number of times the song should loop.
     *
     * @remarks `0` designates infinite.
     */
    "totalLoops": number;
}
/**
 * Default {@linkcode Song#autoSave} values.
 *
 * @category Song
 * @internal
 */
export declare const defaultAutoSave: SongAutoSave;
/**
 * Default {@linkcode Song#loop} values.
 *
 * @category Song
 * @internal
 */
export declare const defaultLoop: SongLoop;
/**
 * Represents a full {@link https://opennbs.org/nbs | NBS song}.
 *
 * @includeExample ./examples/simple/newSong.ts
 * @category Highlights
 * @category Song
 */
export declare class Song {
    #private;
    /**
     * Length of the song in ticks.
     */
    get length(): number;
    /**
     * Version of NBS the song has been saved to.
     *
     * @see https://opennbs.org/nbs
     */
    nbsVersion: number;
    /**
     * Name of the song.
     */
    name: string;
    /**
     * Author of the song.
     */
    author: string;
    /**
     * Original author of the song.
     */
    originalAuthor: string;
    /**
     * Description of the song.
     */
    description: string;
    /**
     * Imported MIDI/Schematic file name.
     */
    importName: string;
    /**
     * Looping options for the song.
     *
     * @see {@linkcode SongLoop}
     */
    get loop(): SongLoop;
    /**
     * Auto-save options for the song.
     *
     * @see {@linkcode SongAutoSave}
     */
    get autoSave(): SongAutoSave;
    /**
     * Number of minutes spent on the song.
     */
    minutesSpent: number;
    /**
     * Number of times the user has left-clicked on the song.
     */
    leftClicks: number;
    /**
     * Number of times the user has right-clicked on the song.
     */
    rightClicks: number;
    /**
     * Number of times the user has added a note block.
     */
    blocksAdded: number;
    /**
     * Number of times the user have removed a note block.
     */
    blocksRemoved: number;
    /**
     * Playtime of the song in milliseconds.
     */
    get duration(): number;
    /**
     * Tick of the last measure of the song.
     */
    get lastMeasure(): number;
    /**
     * Time signature of the song.
     *
     * @example If this is 3, then the signature is 3/4. This value ranges from 2-8.
     */
    timeSignature: number;
    /**
     * Tempo of the song.
     *
     * @remarks Unit is ticks per second. (TPS)
     */
    get tempo(): number;
    /**
     * @remarks Adjusts the {@link Song#timePerTick | time per tick} upon modification.
     */
    set tempo(value: number);
    /**
     * Amount of milliseconds each tick takes.
     */
    get timePerTick(): number;
    /**
     * @remarks Adjusts the {@link Song#tempo | tempo} upon modification.
     */
    set timePerTick(value: number);
    /**
     * Whether the song has at least one solo layer.
     *
     * @see {@linkcode Layer.isSolo}
     */
    get hasSolo(): boolean;
    /**
     * Instruments of the song.
     */
    get instruments(): SongInstruments;
    /**
     * Layers within the song.
     */
    get layers(): SongLayers;
}
