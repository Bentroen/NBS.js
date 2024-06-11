import { Layer } from "./Layer";
/**
 * Represents the {@linkcode Layer}s of a {@linkcode Song} and provides helper functions.
 *
 * @includeExample ./examples/full/randomSong.ts
 * @category Song
 * @category Layer
 */
export declare class SongLayers {
    #private;
    /**
     * Total number of layers.
     */
    get total(): number;
    /**
     * Existing layers.
     */
    get get(): readonly Layer[];
    /**
     * Create and add a new blank {@linkcode Layer}.
     */
    create(): Layer;
    /**
     * Add an existing {@linkcode Layer}.
     *
     * @remarks Any existing layer with the same ID as the added layer will be overwritten.
     *
     * @param layer Layer to add
     */
    add(layer: Layer): void;
    /**
     * Delete a {@linkcode Layer}.
     *
     * @param index Index of the layer to be deleted
     */
    delete(index: number): void;
    /**
     * Iterate each tick-note pair.
     */
    [Symbol.iterator](): Iterator<Layer>;
}
