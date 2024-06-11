/**
 * A buffer object wrapper.
 *
 * @category Internal Utilities
 * @internal
 */
export declare class BufferWrapper {
    /**
     * Buffer that is being read.
     */
    readonly buffer: ArrayBuffer;
    /**
     * Data view for the buffer.
     */
    protected viewer: DataView;
    /**
     * Next byte to read.
     */
    nextByte: number;
    /**
     * Create a buffer wrapper.
     *
     * @param buffer Array buffer to read
     */
    constructor(buffer: ArrayBuffer);
}
