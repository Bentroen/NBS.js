import { BufferWrapper } from "./wrapper";
/**
 * Represents an {@linkcode ArrayBuffer} reader.
 *
 * @category Internal Utilities
 * @internal
 */
export declare class BufferReader extends BufferWrapper {
    /**
     * Read the next byte.
     */
    readByte(): number;
    /**
     * Read the next unsigned byte.
     */
    readUnsingedByte(): number;
    /**
     * Read the next short.
     */
    readShort(): number;
    /**
     * Read the next integer.
     */
    readInt(): number;
    /**
     * Read the next string.
     */
    readString(): string;
}
