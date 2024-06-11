import { Song } from "../Song";
/**
 * Options for {@linkcode fromArrayBuffer}.
 *
 * @category Array Buffer
 * @internal
 */
export interface FromArrayBufferOptions {
    /**
     * Whether to ignore (delete) unpopulated leading layers.
     *
     * @remarks ONBS automatically generates extra layers past the last populated layer.
     */
    "ignoreEmptyLayers"?: boolean;
}
/**
 * Default options for {@linkcode fromArrayBuffer}.
 *
 * @category Array Buffer
 * @internal
 */
export declare const defaultFromArrayBufferOptions: FromArrayBufferOptions;
/**
 * Parse and return a {@linkcode Song} from a file array buffer.
 *
 * @param arrayBuffer Array buffer to parse from
 * @param options Options for parsing
 * @return Parsed song, empty if unsuccessful
 * @includeExample ./examples/simple/read.ts
 * @category Highlights
 * @category Song
 * @category Array Buffer
 */
export declare function fromArrayBuffer(arrayBuffer: ArrayBuffer, options?: FromArrayBufferOptions): Song;
