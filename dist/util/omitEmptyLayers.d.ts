import { Song } from "../nbs/Song";
/**
 * Delete all layers without notes from a {@linkcode Song}.
 *
 * @param song Song to remove empty layers from
 * @param makeClone Whether to create a clone of the song, preventing modification of the original song
 * @returns The song without empty layers (new {@linkcode Song} if cloned, original {@linkcode Song} otherwise)
 * @category Internal Utilities
 */
export declare function omitEmptyLayers(song: Song, makeClone?: boolean): Song;
