/**
 * A buffer object wrapper.
 *
 * @category Internal Utilities
 * @internal
 */
declare class BufferWrapper {
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

/**
 * Represents an {@linkcode ArrayBuffer} reader.
 *
 * @category Internal Utilities
 * @internal
 */
declare class BufferReader extends BufferWrapper {
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

/**
 * Represents an {@linkcode ArrayBuffer} writer.
 *
 * @category Internal Utilities
 * @internal
 */
declare class BufferWriter extends BufferWrapper {
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

/**
 * Context for {@linkcode enumerable}.
 *
 * @category Internal Utilities
 * @internal
 */
interface GetterDecoratorContext {
    /**
     * Name of the property.
     */
    "name": string | symbol;
    /**
     * Type of the property.
     */
    "kind": "getter";
    /**
     * Function applied upon the property.
     */
    addInitializer(initializer: () => void): void;
}
/**
 * Sets a property's getter to be enumerable.
 *
 * @category Internal Utilities
 * @internal
 */
declare function enumerable<T>(getFunction: () => T, { name, addInitializer }: GetterDecoratorContext): () => T;

/**
 * Context for {@linkcode readOnly}.
 *
 * @category Internal Utilities
 * @internal
 */
interface SetterDecoratorContext {
    /**
     * Name of the property.
     */
    "name": string | symbol;
    /**
     * Type of the property.
     */
    "kind": "getter";
    /**
     * Function applied upon the property.
     */
    addInitializer(initializer: () => void): void;
}
/**
 * Sets a getter's setter function to throw an error, preventing modification.
 *
 * @category Internal Utilities
 * @internal
 */
declare function readOnly<T>(getFunction: () => T, { name, addInitializer }: SetterDecoratorContext): () => T;

/**
 * An error called when a read-only property is modified.
 *
 * @category Internal Utilities
 * @internal
 */
declare class IllegalSetError extends Error {
    constructor(property: string);
}

/**
 * Options available for a {@linkcode Note}.
 *
 * @category Note
 */
interface NoteOptions {
    /**
     * {@inheritDoc Note#key}
     */
    "key"?: number;
    /**
     * {@inheritDoc Note#velocity}
     */
    "velocity"?: number;
    /**
     * {@inheritDoc Note#panning}
     */
    "panning"?: number;
    /**
     * {@inheritDoc Note#pitch}
     */
    "pitch"?: number;
}
/**
 * Default {@linkcode NoteOptions} values.
 *
 * @category Note
 * @internal
 */
declare const defaultNoteOptions: Required<NoteOptions>;
/**
 * Represents a note.
 *
 * @includeExample ./examples/design/note.ts
 * @category Highlights
 * @category Note
 */
declare class Note {
    /**
     * Instrument ID of the note.
     */
    instrument: number;
    /**
     * Key of the note block.
     *
     * @remarks From 0-87. 33-57 is within the 2-octave limit.
     * @example 0 is A0 and 87 is C8.
     */
    key: number;
    /**
     * Velocity (volume) of the note block.
     *
     * @remarks From 0% to 100%.
     */
    velocity: number;
    /**
     * Stereo position of the note block.
     *
     * @remarks From -100 to 100.
     * @example 0 means center panning.
     */
    panning: number;
    /**
     * Fine pitch of the note block.
     *
     * @remarks The max in Note Block Studio is limited to -1200 and +1200.
     * @example 0 designates no fine-tuning. ±100 cents is a single semitone difference.
     */
    pitch: number;
    /**
     * Construct a note.
     *
     * @param instrument Instrument ID for the note
     * @param options Options for the note
     */
    constructor(instrument: number, options?: NoteOptions);
}

/**
 * The existing {@linkcode Note}s of the layer.
 *
 * @see {@linkcode LayerNotes#get}
 * @category Layer
 * @category Note
 */
interface ExistingNotes {
    /**
     * Each tick-note pair.
     *
     * @see {@linkcode Note}
     */
    [tick: number]: Note;
}
/**
 * Represents the {@linkcode Note}s of a {@linkcode Layer} and provides helper functions.
 *
 * @includeExample ./examples/full/iterateNotes.ts
 * @category Layer
 * @category Note
 */
declare class LayerNotes {
    #private;
    /**
     * Total number of notes within the {@linkcode Layer}.
     */
    get total(): number;
    /**
     * Array of ticks that contain notes within the {@linkcode Layer}.
     */
    get ticks(): number[];
    /**
     * Existing notes.
     */
    get get(): ExistingNotes;
    /**
     * Set an existing {@linkcode Note} at a tick.
     *
     * @remarks Any existing note at the same tick as the added note will be overwritten.
     * @param tick Tick to set the note on
     * @param note Note to set on tick
     */
    set(tick: number, note: Note): Note;
    /**
     * Create and add a {@linkcode Note} to a tick.
     *
     * @param tick Tick to set the note at
     * @param note The note to add
     */
    add(tick: number, note: Note): Note;
    /**
     * Create and add a {@linkcode Note} to a tick.
     *
     * @param tick Tick to set the note at
     * @param instrument The note's instrument
     * @param options Options for the note
     */
    create(tick: number, instrument: number, options?: NoteOptions): Note;
    /**
     * Delete a {@linkcode Note} at a tick.
     *
     * @param tick Tick to remove note from
     */
    delete(tick: number): void;
    /**
     * Iterate each tick-note pair.
     */
    [Symbol.iterator](): Iterator<[number, Note]>;
}

/**
 * Options available for a {@linkcode Layer}.
 *
 * @category Layer
 */
interface LayerOptions {
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
declare const defaultLayerOptions: Required<LayerOptions>;
/**
 * Represents a layer.
 *
 * @includeExample ./examples/design/layer.ts
 * @category Highlights
 * @category Layer
 */
declare class Layer {
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

/**
 * Represents the {@linkcode Layer}s of a {@linkcode Song} and provides helper functions.
 *
 * @includeExample ./examples/full/randomSong.ts
 * @category Song
 * @category Layer
 */
declare class SongLayers {
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

/**
 * Structure of {@linkcode builtInBuilder}.
 *
 * @category Instrument
 * @internal
 */
interface BuiltInBuilder {
    /**
     * ID-instrument pair.
     */
    [id: number]: {
        /**
         * {@inheritDoc Instrument#name}
         */
        "name": string;
        /**
         * {@inheritDoc Instrument#soundFile}
         */
        "soundFile": string;
    };
}
/**
 * Used to construct {@linkcode Instrument.builtIn}.
 *
 * @satisfies {BuiltInBuilder}
 * @category Instrument
 * @internal
 */
declare const builtInBuilder: BuiltInBuilder;
/**
 * Every built-in instrument.
 *
 * @see {@linkcode Instrument.builtIn}
 * @category Instrument
 */
type BuiltIn = {
    [id in keyof typeof builtInBuilder]: Instrument;
};
/**
 * Options available for an {@linkcode Instrument}.
 *
 * @category Instrument
 */
interface InstrumentOptions {
    /**
     * {@inheritDoc Instrument#name}
     */
    "name"?: string;
    /**
     * {@inheritDoc Instrument#soundFile}
     */
    "soundFile"?: string;
    /**
     * {@inheritDoc Instrument#key}
     */
    "key"?: number;
    /**
     * {@inheritDoc Instrument#pressKey}
     */
    "pressKey"?: boolean;
}
/**
 * Default {@linkcode Instrument} values.
 *
 * @category Instrument
 */
declare const defaultInstrumentOptions: InstrumentOptions;
/**
 * Represents an instrument of a {@linkcode Note}.
 *
 * @includeExample ./examples/design/instrument.ts
 * @category Highlights
 * @category Instrument
 */
declare class Instrument {
    #private;
    /**
     * Instruments built into ONBS.
     */
    static get builtIn(): BuiltIn;
    /**
     * Name of the instrument.
     */
    name?: string;
    /**
     * Sound file of the instrument.
     *
     * @remarks Relative to the `Data/Sounds/` directory of the ONBS installations.
     */
    soundFile: string;
    /**
     * Key of the sound file.
     *
     * @remarks Just like note blocks, this ranges from 0-87.
     *
     * @see {@linkcode Note#key}
     */
    key: number;
    /**
     * Whether the on-screen piano should visually press keys when these notes are played.
     */
    pressKey: boolean;
    /**
     * Whether the instrument is a built-in instrument.
     */
    get isBuiltIn(): boolean;
    /**
     * Construct an instrument.
     *
     * @param options Options for the instrument
     */
    constructor(options?: InstrumentOptions);
}

/**
 * The existing {@linkcode Instrument}s.
 *
 * @see {@linkcode SongInstruments#get}
 * @category Song
 * @category Instrument
 */
interface ExistingInstruments extends BuiltIn {
    /**
     * ID-Instrument pair.
     *
     * @see {@linkcode Instrument}
     */
    [id: number]: Instrument;
}
/**
 * Represents the {@linkcode Instrument}s of a {@linkcode Song} and provides helper functions.
 *
 * @category Instrument
 */
declare class SongInstruments {
    #private;
    /**
     * Total number of instruments.
     */
    get total(): number;
    /**
     * Existing instruments.
     */
    get get(): ExistingInstruments;
    /**
     * The ID of the first custom instrument.
     */
    get firstCustomIndex(): number;
    /**
     * Set an existing {@linkcode Instrument} at an ID.
     *
     * @remarks Any existing instrument with the same ID as the added instrument will be overwritten.
     * @see Built-in instruments cannot be modified!
     * @param id ID of the instrument to be set
     */
    set(id: number, instrument: Instrument): Instrument;
    /**
     * Add an existing {@linkcode Instrument}.
     *
     * @param instrument Instrument to add
     */
    add(instrument: Instrument): Instrument;
    /**
     * Create and add an {@linkcode Instrument}.
     *
     * @param options Options for the instrument
     */
    create(options: InstrumentOptions): Instrument;
    /**
     * Delete an {@linkcode Instrument}.
     *
     * @see Built-in instruments cannot be delted!
     * @param id ID of the instrument to be deleted
     */
    delete(id: number): void;
    /**
     * Iterate each id-instrument pair.
     */
    [Symbol.iterator](): Iterable<[number, Instrument]>;
}

/**
 * Options available for {@linkcode Song#autoSave}.
 *
 * @category Song
 */
interface SongAutoSave {
    /**
     * Whether auto-saving has been enabled.
     */
    "enabled": boolean;
    /**
     * Number of minutes between each auto-save.
     *
     * @remarks Ranges from 1 to 60.
     */
    "interval": number;
}
/**
 * Options available for {@linkcode Song#loop}.
 *
 * @category Song
 */
interface SongLoop {
    /**
     * Whether looping is enabled.
     */
    "enabled": boolean;
    /**
     * Where the song should loop back to.
     *
     * @remarks Unit is ticks.
     */
    "startTick": number;
    /**
     * Number of times the song should loop.
     *
     * @remarks `0` designates infinite.
     */
    "totalLoops": number;
}
/**
 * Default {@linkcode Song#autoSave} values.
 *
 * @category Song
 * @internal
 */
declare const defaultAutoSave: SongAutoSave;
/**
 * Default {@linkcode Song#loop} values.
 *
 * @category Song
 * @internal
 */
declare const defaultLoop: SongLoop;
/**
 * Represents a full {@link https://opennbs.org/nbs | NBS song}.
 *
 * @includeExample ./examples/simple/newSong.ts
 * @category Highlights
 * @category Song
 */
declare class Song {
    #private;
    /**
     * Length of the song in ticks.
     */
    get length(): number;
    /**
     * Version of NBS the song has been saved to.
     *
     * @see https://opennbs.org/nbs
     */
    nbsVersion: number;
    /**
     * Name of the song.
     */
    name: string;
    /**
     * Author of the song.
     */
    author: string;
    /**
     * Original author of the song.
     */
    originalAuthor: string;
    /**
     * Description of the song.
     */
    description: string;
    /**
     * Imported MIDI/Schematic file name.
     */
    importName: string;
    /**
     * Looping options for the song.
     *
     * @see {@linkcode SongLoop}
     */
    get loop(): SongLoop;
    /**
     * Auto-save options for the song.
     *
     * @see {@linkcode SongAutoSave}
     */
    get autoSave(): SongAutoSave;
    /**
     * Number of minutes spent on the song.
     */
    minutesSpent: number;
    /**
     * Number of times the user has left-clicked on the song.
     */
    leftClicks: number;
    /**
     * Number of times the user has right-clicked on the song.
     */
    rightClicks: number;
    /**
     * Number of times the user has added a note block.
     */
    blocksAdded: number;
    /**
     * Number of times the user have removed a note block.
     */
    blocksRemoved: number;
    /**
     * Playtime of the song in milliseconds.
     */
    get duration(): number;
    /**
     * Tick of the last measure of the song.
     */
    get lastMeasure(): number;
    /**
     * Time signature of the song.
     *
     * @example If this is 3, then the signature is 3/4. This value ranges from 2-8.
     */
    timeSignature: number;
    /**
     * Tempo of the song.
     *
     * @remarks Unit is ticks per second. (TPS)
     */
    get tempo(): number;
    /**
     * @remarks Adjusts the {@link Song#timePerTick | time per tick} upon modification.
     */
    set tempo(value: number);
    /**
     * Amount of milliseconds each tick takes.
     */
    get timePerTick(): number;
    /**
     * @remarks Adjusts the {@link Song#tempo | tempo} upon modification.
     */
    set timePerTick(value: number);
    /**
     * Whether the song has at least one solo layer.
     *
     * @see {@linkcode Layer.isSolo}
     */
    get hasSolo(): boolean;
    /**
     * Instruments of the song.
     */
    get instruments(): SongInstruments;
    /**
     * Layers within the song.
     */
    get layers(): SongLayers;
}

/**
 * Options for {@linkcode toArrayBuffer}.
 *
 * @category Array Buffer
 * @internal
 */
interface ToArrayBufferOptions {
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
declare const defaultToArrayBufferOptions: ToArrayBufferOptions;
/**
 * Generate an {@linkcode ArrayBuffer} from a {@linkcode Song}.
 *
 * @param song Song to parse from
 * @return Generated array buffer, empty if unsuccessful
 * @includeExample ./examples/simple/write.ts
 * @category Highlights
 * @category Array Buffer
 */
declare function toArrayBuffer(song: Song, options?: ToArrayBufferOptions): ArrayBuffer;

/**
 * Structure for {@linkcode ignoredValues}.
 *
 * @category JSON
 * @internal
 */
interface IgnoredValues {
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
declare const ignoredValues: IgnoredValues;
/**
 * Generate a {@linkcode JSON} object from a {@linkcode Song}.
 *
 * @param song Song to parse from
 * @returns Generated {@linkcode JSON} object
 * @includeExample ./examples/full/toJSON.ts
 * @category JSON
 */
declare function toJSON(song: Song): object;

/**
 * Options for {@linkcode fromArrayBuffer}.
 *
 * @category Array Buffer
 * @internal
 */
interface FromArrayBufferOptions {
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
declare const defaultFromArrayBufferOptions: FromArrayBufferOptions;
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
declare function fromArrayBuffer(arrayBuffer: ArrayBuffer, options?: FromArrayBufferOptions): Song;

/**
 * Parse and return a {@linkcode Song} from a JSON object.
 *
 * @param json {@linkcode JSON} object to parse from
 * @returns Parsed song
 * @category Song
 * @category JSON
 */
declare function fromJSON(json: object): Song;

/**
 * Delete all layers without notes from a {@linkcode Song}.
 *
 * @param song Song to remove empty layers from
 * @param makeClone Whether to create a clone of the song, preventing modification of the original song
 * @returns The song without empty layers (new {@linkcode Song} if cloned, original {@linkcode Song} otherwise)
 * @category Internal Utilities
 */
declare function omitEmptyLayers(song: Song, makeClone?: boolean): Song;

export { BufferReader, BufferWrapper, BufferWriter, type BuiltIn, type BuiltInBuilder, type ExistingInstruments, type ExistingNotes, type FromArrayBufferOptions, type GetterDecoratorContext, type IgnoredValues, IllegalSetError, Instrument, type InstrumentOptions, Layer, LayerNotes, type LayerOptions, Note, type NoteOptions, type SetterDecoratorContext, Song, type SongAutoSave, SongInstruments, SongLayers, type SongLoop, type ToArrayBufferOptions, builtInBuilder, defaultAutoSave, defaultFromArrayBufferOptions, defaultInstrumentOptions, defaultLayerOptions, defaultLoop, defaultNoteOptions, defaultToArrayBufferOptions, enumerable, fromArrayBuffer, fromJSON, ignoredValues, omitEmptyLayers, readOnly, toArrayBuffer, toJSON };
