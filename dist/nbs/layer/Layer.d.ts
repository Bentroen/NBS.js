import { LayerNotes } from "../note/LayerNotes";
/**
 * Options available for a {@linkcode Layer}.
 *
 * @category Layer
 */
export interface LayerOptions {
    /**
     * {@inheritDoc Layer#name}
     */
    "name"?: string;
    /**
     * {@inheritDoc Layer#isLocked}
     */
    "isLocked"?: boolean;
    /**
     * {@inheritDoc Layer#isSolo}
     */
    "isSolo"?: boolean;
    /**
     * {@inheritDoc Layer#volume}
     */
    "volume"?: number;
    /**
     * {@inheritDoc Layer#stereo}
     */
    "stereo"?: number;
}
/**
 * Default {@linkcode Layer} values.
 *
 * @category Layer
 * @internal
 */
export declare const defaultLayerOptions: Required<LayerOptions>;
/**
 * Represents a layer.
 *
 * @includeExample ./examples/design/layer.ts
 * @category Highlights
 * @category Layer
 */
export declare class Layer {
    #private;
    /**
     * Name of the layer.
     */
    name?: string;
    /**
     * Whether this layer has been marked as locked.
     */
    isLocked: boolean;
    /**
     * Whether this layer has been marked as solo.
     */
    isSolo: boolean;
    /**
     * Volume of the layer.
     *
     * @remarks Unit is percentage.
     */
    volume: number;
    /**
     * How much this layer is panned to the left or right.
     *
     * @example -100 is 2 blocks right, 0 is center, 100 is 2 blocks left.
     */
    stereo: number;
    /**
     * Notes within the layer.
     */
    get notes(): LayerNotes;
    constructor(options?: LayerOptions);
}
