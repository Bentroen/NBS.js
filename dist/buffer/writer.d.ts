import { BufferWrapper } from "./wrapper";
/**
 * Represents an {@linkcode ArrayBuffer} writer.
 *
 * @category Internal Utilities
 * @internal
 */
export declare class BufferWriter extends BufferWrapper {
    #private;
    /**
     * Create a buffer writer.
     *
     * @param buffer Array buffer to read
     * @param dry Whether to execute a dry run, used to find the target size of the buffer
     */
    constructor(buffer: ArrayBuffer, dry?: boolean);
    /**
     * Write a byte.
     */
    writeByte(value?: number | undefined): void;
    /**
     * Write an unsigned byte.
     */
    writeUnsignedByte(value?: number | undefined): void;
    /**
     * Write a short.
     */
    writeShort(value?: number | undefined): void;
    /**
     * Write an integer.
     */
    writeInt(value?: number | undefined): void;
    /**
     * Write a string.
     */
    writeString(value?: string | undefined): void;
}
