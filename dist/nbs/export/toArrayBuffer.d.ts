import { Song } from "../Song";
/**
 * Options for {@linkcode toArrayBuffer}.
 *
 * @category Array Buffer
 * @internal
 */
export interface ToArrayBufferOptions {
    /**
     * Whether to ignore unpopulated leading layers.
     */
    "ignoreEmptyLayers"?: boolean;
}
/**
 * Default options for {@linkcode toArrayBuffer}.
 *
 * @category Array Buffer
 * @internal
 */
export declare const defaultToArrayBufferOptions: ToArrayBufferOptions;
/**
 * Generate an {@linkcode ArrayBuffer} from a {@linkcode Song}.
 *
 * @param song Song to parse from
 * @return Generated array buffer, empty if unsuccessful
 * @includeExample ./examples/simple/write.ts
 * @category Highlights
 * @category Array Buffer
 */
export declare function toArrayBuffer(song: Song, options?: ToArrayBufferOptions): ArrayBuffer;
