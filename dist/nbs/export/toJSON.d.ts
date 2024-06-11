import { Song } from "../Song";
/**
 * Structure for {@linkcode ignoredValues}.
 *
 * @category JSON
 * @internal
 */
export interface IgnoredValues {
    /**
     * Key to ignore if equal to value.
     */
    [key: string]: unknown;
}
/**
 * Values that will be ignored during export if matched.
 *
 * @category JSON
 * @internal
 */
export declare const ignoredValues: IgnoredValues;
/**
 * Generate a {@linkcode JSON} object from a {@linkcode Song}.
 *
 * @param song Song to parse from
 * @returns Generated {@linkcode JSON} object
 * @includeExample ./examples/full/toJSON.ts
 * @category JSON
 */
export declare function toJSON(song: Song): object;
