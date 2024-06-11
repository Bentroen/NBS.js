/**
 * An error called when a read-only property is modified.
 *
 * @category Internal Utilities
 * @internal
 */
export declare class IllegalSetError extends Error {
    constructor(property: string);
}
