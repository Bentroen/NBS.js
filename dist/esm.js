var __defProp$7 = Object.defineProperty;
var __defNormalProp$7 = (obj, key, value) => key in obj ? __defProp$7(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$4 = (obj, key, value) => __defNormalProp$7(obj, typeof key !== "symbol" ? key + "" : key, value);
class BufferWrapper {
  /**
   * Create a buffer wrapper.
   *
   * @param buffer Array buffer to read
   */
  constructor(buffer) {
    /**
     * Buffer that is being read.
     */
    __publicField$4(this, "buffer");
    /**
     * Data view for the buffer.
     */
    __publicField$4(this, "viewer");
    /**
     * Next byte to read.
     */
    __publicField$4(this, "nextByte", 0);
    this.buffer = buffer;
    this.viewer = new DataView(buffer);
  }
}

class BufferReader extends BufferWrapper {
  /**
   * Read the next byte.
   */
  readByte() {
    const result = this.viewer.getInt8(this.nextByte);
    this.nextByte += 1;
    return result;
  }
  /**
   * Read the next unsigned byte.
   */
  readUnsingedByte() {
    const result = this.viewer.getUint8(this.nextByte);
    this.nextByte += 1;
    return result;
  }
  /**
   * Read the next short.
   */
  readShort() {
    const result = this.viewer.getInt16(this.nextByte, true);
    this.nextByte += 2;
    return result;
  }
  /**
   * Read the next integer.
   */
  readInt() {
    const result = this.viewer.getInt32(this.nextByte, true);
    this.nextByte += 4;
    return result;
  }
  /**
   * Read the next string.
   */
  readString() {
    const length = this.readInt();
    let result = "";
    for (let i = 0; i < length; i++) {
      const byte = this.readUnsingedByte();
      result += String.fromCodePoint(byte);
    }
    return result;
  }
}

var __typeError$6 = (msg) => {
  throw TypeError(msg);
};
var __accessCheck$6 = (obj, member, msg) => member.has(obj) || __typeError$6("Cannot " + msg);
var __privateGet$6 = (obj, member, getter) => (__accessCheck$6(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$6 = (obj, member, value) => member.has(obj) ? __typeError$6("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$6 = (obj, member, value, setter) => (__accessCheck$6(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var _dry;
class BufferWriter extends BufferWrapper {
  /**
   * Create a buffer writer.
   *
   * @param buffer Array buffer to read
   * @param dry Whether to execute a dry run, used to find the target size of the buffer
   */
  constructor(buffer, dry = false) {
    super(buffer);
    /**
     * Whether to execute a dry run.
     */
    __privateAdd$6(this, _dry);
    __privateSet$6(this, _dry, dry);
  }
  /**
   * Write a byte.
   */
  writeByte(value = 0) {
    if (!__privateGet$6(this, _dry)) {
      this.viewer.setInt8(this.nextByte, Math.floor(value));
    }
    this.nextByte += 1;
  }
  /**
   * Write an unsigned byte.
   */
  writeUnsignedByte(value = 0) {
    if (!__privateGet$6(this, _dry)) {
      this.viewer.setUint8(this.nextByte, value);
    }
    this.nextByte += 1;
  }
  /**
   * Write a short.
   */
  writeShort(value = 0) {
    if (!__privateGet$6(this, _dry)) {
      this.viewer.setInt16(this.nextByte, value, true);
    }
    this.nextByte += 2;
  }
  /**
   * Write an integer.
   */
  writeInt(value = 0) {
    if (!__privateGet$6(this, _dry)) {
      this.viewer.setInt32(this.nextByte, value, true);
    }
    this.nextByte += 4;
  }
  /**
   * Write a string.
   */
  writeString(value = "") {
    this.writeInt(value.length);
    for (const i of value) {
      this.writeUnsignedByte(i.charCodeAt(0));
    }
  }
}
_dry = new WeakMap();

function enumerable(getFunction, { name, addInitializer }) {
  addInitializer(function() {
    const descriptor = Object.getOwnPropertyDescriptor(this, name) ?? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), name);
    Object.defineProperty(this, name, {
      ...descriptor,
      "enumerable": true
    });
  });
  return getFunction;
}

class IllegalSetError extends Error {
  constructor(property) {
    super(`Property "${property}" is read-only and cannot be modified!`);
    this.name = "IllegalSetError";
  }
}

function readOnly(getFunction, { name, addInitializer }) {
  addInitializer(function() {
    const descriptor = Object.getOwnPropertyDescriptor(this, name) ?? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), name);
    Object.defineProperty(this, name, {
      ...descriptor,
      "set": () => {
        throw new IllegalSetError(name.toString());
      }
    });
  });
  return getFunction;
}

var __defProp$6 = Object.defineProperty;
var __defNormalProp$6 = (obj, key, value) => key in obj ? __defProp$6(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$3 = (obj, key, value) => __defNormalProp$6(obj, typeof key !== "symbol" ? key + "" : key, value);
const defaultNoteOptions = {
  "key": 45,
  "velocity": 100,
  "panning": 0,
  "pitch": 0
};
class Note {
  /**
   * Construct a note.
   *
   * @param instrument Instrument ID for the note
   * @param options Options for the note
   */
  constructor(instrument, options = defaultNoteOptions) {
    /**
     * Instrument ID of the note.
     */
    __publicField$3(this, "instrument", 0);
    /**
     * Key of the note block.
     *
     * @remarks From 0-87. 33-57 is within the 2-octave limit.
     * @example 0 is A0 and 87 is C8.
     */
    __publicField$3(this, "key", defaultNoteOptions.key);
    /**
     * Velocity (volume) of the note block.
     *
     * @remarks From 0% to 100%.
     */
    __publicField$3(this, "velocity", defaultNoteOptions.velocity);
    /**
     * Stereo position of the note block.
     *
     * @remarks From -100 to 100.
     * @example 0 means center panning.
     */
    __publicField$3(this, "panning", defaultNoteOptions.panning);
    /**
     * Fine pitch of the note block.
     *
     * @remarks The max in Note Block Studio is limited to -1200 and +1200.
     * @example 0 designates no fine-tuning. ±100 cents is a single semitone difference.
     */
    __publicField$3(this, "pitch", defaultNoteOptions.pitch);
    const mergedOptions = {
      ...defaultNoteOptions,
      ...options
    };
    this.instrument = instrument;
    this.key = mergedOptions.key;
    this.velocity = mergedOptions.velocity;
    this.panning = mergedOptions.panning;
    this.pitch = mergedOptions.pitch;
  }
}

var __create$5 = Object.create;
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __knownSymbol$5 = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError$5 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp$5 = (obj, key, value) => key in obj ? __defProp$5(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name$5 = (target, value) => __defProp$5(target, "name", { value, configurable: true });
var __decoratorStart$5 = (base) => [, , , __create$5(base?.[__knownSymbol$5("metadata")] ?? null)];
var __decoratorStrings$5 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn$5 = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError$5("Function expected") : fn;
var __decoratorContext$5 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings$5[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError$5("Already initialized") : fns.push(__expectFn$5(fn || null)) });
var __decoratorMetadata$5 = (array, target) => __defNormalProp$5(target, __knownSymbol$5("metadata"), array[3]);
var __runInitializers$5 = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement$5 = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings$5[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc$5(k < 4 ? target : { get [name]() {
    return __privateGet$5(this, extra);
  }, set [name](x) {
    return __privateSet$5(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name$5(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name$5(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext$5(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn$5(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet$5 : __privateMethod$5)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet$5(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn$5(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError$5("Object expected");
    else __expectFn$5(fn = it.get) && (desc.get = fn), __expectFn$5(fn = it.set) && (desc.set = fn), __expectFn$5(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata$5(array, target), desc && __defProp$5(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __accessCheck$5 = (obj, member, msg) => member.has(obj) || __typeError$5("Cannot " + msg);
var __privateIn$5 = (member, obj) => Object(obj) !== obj ? __typeError$5('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet$5 = (obj, member, getter) => (__accessCheck$5(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$5 = (obj, member, value) => member.has(obj) ? __typeError$5("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$5 = (obj, member, value, setter) => (__accessCheck$5(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod$5 = (obj, member, method) => (__accessCheck$5(obj, member, "access private method"), method);
var _get_dec$2, _ticks_dec, _total_dec$2, _existing$2, _init$5;
class LayerNotes {
  constructor() {
    __runInitializers$5(_init$5, 5, this);
    /**
     * {@inheritDoc LayerNotes#get}
     */
    __privateAdd$5(this, _existing$2, {});
  }
  get total() {
    return Object.keys(__privateGet$5(this, _existing$2)).length;
  }
  get ticks() {
    return Object.keys(__privateGet$5(this, _existing$2)).map((key) => +key);
  }
  get get() {
    return Object.freeze({ ...__privateGet$5(this, _existing$2) });
  }
  /**
   * Set an existing {@linkcode Note} at a tick.
   *
   * @remarks Any existing note at the same tick as the added note will be overwritten.
   * @param tick Tick to set the note on
   * @param note Note to set on tick
   */
  set(tick, note) {
    __privateGet$5(this, _existing$2)[tick] = note;
    return note;
  }
  /**
   * Create and add a {@linkcode Note} to a tick.
   *
   * @param tick Tick to set the note at
   * @param note The note to add
   */
  add(tick, note) {
    return this.set(tick, note);
  }
  /**
   * Create and add a {@linkcode Note} to a tick.
   *
   * @param tick Tick to set the note at
   * @param instrument The note's instrument
   * @param options Options for the note
   */
  create(tick, instrument, options = defaultNoteOptions) {
    const note = new Note(instrument, options);
    return this.add(tick, note);
  }
  /**
   * Delete a {@linkcode Note} at a tick.
   *
   * @param tick Tick to remove note from
   */
  delete(tick) {
    delete __privateGet$5(this, _existing$2)[tick];
  }
  /**
   * Iterate each tick-note pair.
   */
  *[(_total_dec$2 = [enumerable, readOnly], _ticks_dec = [enumerable, readOnly], _get_dec$2 = [enumerable, readOnly], Symbol.iterator)]() {
    for (const [id, note] of Object.entries(__privateGet$5(this, _existing$2))) {
      yield [+id, note];
    }
  }
}
_init$5 = __decoratorStart$5(null);
_existing$2 = new WeakMap();
__decorateElement$5(_init$5, 2, "total", _total_dec$2, LayerNotes);
__decorateElement$5(_init$5, 2, "ticks", _ticks_dec, LayerNotes);
__decorateElement$5(_init$5, 2, "get", _get_dec$2, LayerNotes);
__decoratorMetadata$5(_init$5, LayerNotes);

var __create$4 = Object.create;
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __knownSymbol$4 = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError$4 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp$4 = (obj, key, value) => key in obj ? __defProp$4(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name$4 = (target, value) => __defProp$4(target, "name", { value, configurable: true });
var __decoratorStart$4 = (base) => [, , , __create$4(base?.[__knownSymbol$4("metadata")] ?? null)];
var __decoratorStrings$4 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn$4 = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError$4("Function expected") : fn;
var __decoratorContext$4 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings$4[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError$4("Already initialized") : fns.push(__expectFn$4(fn || null)) });
var __decoratorMetadata$4 = (array, target) => __defNormalProp$4(target, __knownSymbol$4("metadata"), array[3]);
var __runInitializers$4 = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement$4 = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings$4[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc$4(k < 4 ? target : { get [name]() {
    return __privateGet$4(this, extra);
  }, set [name](x) {
    return __privateSet$4(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name$4(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name$4(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext$4(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn$4(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet$4 : __privateMethod$4)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet$4(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn$4(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError$4("Object expected");
    else __expectFn$4(fn = it.get) && (desc.get = fn), __expectFn$4(fn = it.set) && (desc.set = fn), __expectFn$4(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata$4(array, target), desc && __defProp$4(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __publicField$2 = (obj, key, value) => __defNormalProp$4(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck$4 = (obj, member, msg) => member.has(obj) || __typeError$4("Cannot " + msg);
var __privateIn$4 = (member, obj) => Object(obj) !== obj ? __typeError$4('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet$4 = (obj, member, getter) => (__accessCheck$4(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$4 = (obj, member, value) => member.has(obj) ? __typeError$4("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$4 = (obj, member, value, setter) => (__accessCheck$4(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod$4 = (obj, member, method) => (__accessCheck$4(obj, member, "access private method"), method);
var _notes_dec, _notes, _init$4;
const defaultLayerOptions = {
  "name": void 0,
  "isLocked": false,
  "isSolo": false,
  "volume": 100,
  "stereo": 0
};
_notes_dec = [readOnly, enumerable];
class Layer {
  constructor(options = defaultLayerOptions) {
    __runInitializers$4(_init$4, 5, this);
    /**
     * {@inheritDoc Layer#notes}
     */
    __privateAdd$4(this, _notes, new LayerNotes());
    /**
     * Name of the layer.
     */
    __publicField$2(this, "name", defaultLayerOptions.name);
    /**
     * Whether this layer has been marked as locked.
     */
    __publicField$2(this, "isLocked", defaultLayerOptions.isLocked);
    /**
     * Whether this layer has been marked as solo.
     */
    __publicField$2(this, "isSolo", defaultLayerOptions.isSolo);
    /**
     * Volume of the layer.
     *
     * @remarks Unit is percentage.
     */
    __publicField$2(this, "volume", defaultLayerOptions.volume);
    /**
     * How much this layer is panned to the left or right.
     *
     * @example -100 is 2 blocks right, 0 is center, 100 is 2 blocks left.
     */
    __publicField$2(this, "stereo", defaultLayerOptions.stereo);
    const mergedOptions = {
      ...defaultLayerOptions,
      ...options
    };
    this.name = mergedOptions.name;
    this.isLocked = mergedOptions.isLocked;
    this.isSolo = mergedOptions.isSolo;
    this.volume = mergedOptions.volume;
    this.stereo = mergedOptions.stereo;
  }
  get notes() {
    return __privateGet$4(this, _notes);
  }
}
_init$4 = __decoratorStart$4(null);
_notes = new WeakMap();
__decorateElement$4(_init$4, 2, "notes", _notes_dec, Layer);
__decoratorMetadata$4(_init$4, Layer);

var __create$3 = Object.create;
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __knownSymbol$3 = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError$3 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp$3 = (obj, key, value) => key in obj ? __defProp$3(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name$3 = (target, value) => __defProp$3(target, "name", { value, configurable: true });
var __decoratorStart$3 = (base) => [, , , __create$3(base?.[__knownSymbol$3("metadata")] ?? null)];
var __decoratorStrings$3 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn$3 = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError$3("Function expected") : fn;
var __decoratorContext$3 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings$3[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError$3("Already initialized") : fns.push(__expectFn$3(fn || null)) });
var __decoratorMetadata$3 = (array, target) => __defNormalProp$3(target, __knownSymbol$3("metadata"), array[3]);
var __runInitializers$3 = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement$3 = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings$3[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc$3(k < 4 ? target : { get [name]() {
    return __privateGet$3(this, extra);
  }, set [name](x) {
    return __privateSet$3(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name$3(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name$3(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext$3(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn$3(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet$3 : __privateMethod$3)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet$3(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn$3(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError$3("Object expected");
    else __expectFn$3(fn = it.get) && (desc.get = fn), __expectFn$3(fn = it.set) && (desc.set = fn), __expectFn$3(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata$3(array, target), desc && __defProp$3(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __accessCheck$3 = (obj, member, msg) => member.has(obj) || __typeError$3("Cannot " + msg);
var __privateIn$3 = (member, obj) => Object(obj) !== obj ? __typeError$3('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet$3 = (obj, member, getter) => (__accessCheck$3(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$3 = (obj, member, value) => member.has(obj) ? __typeError$3("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$3 = (obj, member, value, setter) => (__accessCheck$3(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod$3 = (obj, member, method) => (__accessCheck$3(obj, member, "access private method"), method);
var _get_dec$1, _total_dec$1, _existing$1, _init$3;
class SongLayers {
  constructor() {
    __runInitializers$3(_init$3, 5, this);
    /**
     * {@inheritDoc SongLayers#get}
     */
    __privateAdd$3(this, _existing$1, []);
  }
  get total() {
    return __privateGet$3(this, _existing$1).length;
  }
  get get() {
    return Object.freeze([...__privateGet$3(this, _existing$1)]);
  }
  /**
   * Create and add a new blank {@linkcode Layer}.
   */
  create() {
    const layer = new Layer();
    __privateGet$3(this, _existing$1)[__privateGet$3(this, _existing$1).length] = layer;
    return layer;
  }
  /**
   * Add an existing {@linkcode Layer}.
   *
   * @remarks Any existing layer with the same ID as the added layer will be overwritten.
   *
   * @param layer Layer to add
   */
  add(layer) {
    __privateGet$3(this, _existing$1)[__privateGet$3(this, _existing$1).length] = layer;
  }
  /**
   * Delete a {@linkcode Layer}.
   *
   * @param index Index of the layer to be deleted
   */
  delete(index) {
    __privateGet$3(this, _existing$1).splice(index, 1);
  }
  /**
   * Iterate each tick-note pair.
   */
  [(_total_dec$1 = [enumerable, readOnly], _get_dec$1 = [enumerable, readOnly], Symbol.iterator)]() {
    return __privateGet$3(this, _existing$1).values();
  }
}
_init$3 = __decoratorStart$3(null);
_existing$1 = new WeakMap();
__decorateElement$3(_init$3, 2, "total", _total_dec$1, SongLayers);
__decorateElement$3(_init$3, 2, "get", _get_dec$1, SongLayers);
__decoratorMetadata$3(_init$3, SongLayers);

var __create$2 = Object.create;
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __knownSymbol$2 = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError$2 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp$2 = (obj, key, value) => key in obj ? __defProp$2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name$2 = (target, value) => __defProp$2(target, "name", { value, configurable: true });
var __decoratorStart$2 = (base) => [, , , __create$2(base?.[__knownSymbol$2("metadata")] ?? null)];
var __decoratorStrings$2 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn$2 = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError$2("Function expected") : fn;
var __decoratorContext$2 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings$2[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError$2("Already initialized") : fns.push(__expectFn$2(fn || null)) });
var __decoratorMetadata$2 = (array, target) => __defNormalProp$2(target, __knownSymbol$2("metadata"), array[3]);
var __runInitializers$2 = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement$2 = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings$2[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc$2(k < 4 ? target : { get [name]() {
    return __privateGet$2(this, extra);
  }, set [name](x) {
    return __privateSet$2(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name$2(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name$2(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext$2(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn$2(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet$2 : __privateMethod$2)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet$2(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn$2(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError$2("Object expected");
    else __expectFn$2(fn = it.get) && (desc.get = fn), __expectFn$2(fn = it.set) && (desc.set = fn), __expectFn$2(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata$2(array, target), desc && __defProp$2(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __publicField$1 = (obj, key, value) => __defNormalProp$2(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck$2 = (obj, member, msg) => member.has(obj) || __typeError$2("Cannot " + msg);
var __privateIn$2 = (member, obj) => Object(obj) !== obj ? __typeError$2('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet$2 = (obj, member, getter) => (__accessCheck$2(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$2 = (obj, member, value) => member.has(obj) ? __typeError$2("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$2 = (obj, member, value, setter) => (__accessCheck$2(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod$2 = (obj, member, method) => (__accessCheck$2(obj, member, "access private method"), method);
var _isBuiltIn_dec, _builtIn_dec, _builtIn, _init$2, _isBuiltIn;
const builtInBuilder = {
  0: {
    "name": "Harp",
    "soundFile": "harp.ogg"
  },
  1: {
    "name": "Double Bass",
    "soundFile": "dbass.ogg"
  },
  2: {
    "name": "Bass Drum",
    "soundFile": "bdrum.ogg"
  },
  3: {
    "name": "Snare Drum",
    "soundFile": "sdrum.ogg"
  },
  4: {
    "name": "Click",
    "soundFile": "click.ogg"
  },
  5: {
    "name": "Guitar",
    "soundFile": "guitar.ogg"
  },
  6: {
    "name": "Flute",
    "soundFile": "flute.ogg"
  },
  7: {
    "name": "Bell",
    "soundFile": "bell.ogg"
  },
  8: {
    "name": "Chime",
    "soundFile": "icechime.ogg"
  },
  9: {
    "name": "Xylophone",
    "soundFile": "xylobone.ogg"
  },
  10: {
    "name": "Iron Xylophone",
    "soundFile": "iron_xylophone.ogg"
  },
  11: {
    "name": "Cow Bell",
    "soundFile": "cow_bell.ogg"
  },
  12: {
    "name": "Didgeridoo",
    "soundFile": "didgeridoo.ogg"
  },
  13: {
    "name": "Bit",
    "soundFile": "bit.ogg"
  },
  14: {
    "name": "Banjo",
    "soundFile": "banjo.ogg"
  },
  15: {
    "name": "Pling",
    "soundFile": "pling.ogg"
  }
};
const defaultInstrumentOptions = {
  "name": "",
  "soundFile": "",
  "key": 45,
  "pressKey": false
};
_builtIn_dec = [enumerable, readOnly], _isBuiltIn_dec = [enumerable, readOnly];
const _Instrument = class _Instrument {
  /**
   * Construct an instrument.
   *
   * @param options Options for the instrument
   */
  constructor(options = defaultInstrumentOptions) {
    __runInitializers$2(_init$2, 5, this);
    /**
     * {@inheritDoc Instrument#isBuiltIn}
     */
    __privateAdd$2(this, _isBuiltIn, false);
    /**
     * Name of the instrument.
     */
    __publicField$1(this, "name");
    /**
     * Sound file of the instrument.
     *
     * @remarks Relative to the `Data/Sounds/` directory of the ONBS installations.
     */
    __publicField$1(this, "soundFile");
    /**
     * Key of the sound file.
     *
     * @remarks Just like note blocks, this ranges from 0-87.
     *
     * @see {@linkcode Note#key}
     */
    __publicField$1(this, "key", defaultInstrumentOptions.key);
    /**
     * Whether the on-screen piano should visually press keys when these notes are played.
     */
    __publicField$1(this, "pressKey", defaultInstrumentOptions.pressKey);
    const mergedOptions = {
      ...defaultInstrumentOptions,
      ...options
    };
    this.name = mergedOptions.name ?? defaultInstrumentOptions.name;
    this.soundFile = mergedOptions.soundFile ?? defaultInstrumentOptions.soundFile;
    this.pressKey = mergedOptions.pressKey ?? defaultInstrumentOptions.pressKey;
    this.key = mergedOptions.key ?? defaultInstrumentOptions.key;
  }
  static get builtIn() {
    return Object.freeze({ ...__privateGet$2(_Instrument, _builtIn) });
  }
  get isBuiltIn() {
    return __privateGet$2(this, _isBuiltIn);
  }
};
_init$2 = __decoratorStart$2(null);
_builtIn = new WeakMap();
_isBuiltIn = new WeakMap();
__decorateElement$2(_init$2, 10, "builtIn", _builtIn_dec, _Instrument);
__decorateElement$2(_init$2, 2, "isBuiltIn", _isBuiltIn_dec, _Instrument);
__decoratorMetadata$2(_init$2, _Instrument);
__runInitializers$2(_init$2, 3, _Instrument);
/**
 * {@inheritDoc Instrument.builtIn}
 */
__privateAdd$2(_Instrument, _builtIn, Object.fromEntries(
  Object.entries(builtInBuilder).map(([id, value]) => {
    const instrument = new _Instrument(value);
    __privateSet$2(instrument, _isBuiltIn, true);
    return [id, instrument];
  })
));
__privateGet$2(_Instrument, _builtIn)[0].pressKey = true;
let Instrument = _Instrument;

var __create$1 = Object.create;
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __knownSymbol$1 = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError$1 = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name$1 = (target, value) => __defProp$1(target, "name", { value, configurable: true });
var __decoratorStart$1 = (base) => [, , , __create$1(base?.[__knownSymbol$1("metadata")] ?? null)];
var __decoratorStrings$1 = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn$1 = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError$1("Function expected") : fn;
var __decoratorContext$1 = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings$1[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError$1("Already initialized") : fns.push(__expectFn$1(fn || null)) });
var __decoratorMetadata$1 = (array, target) => __defNormalProp$1(target, __knownSymbol$1("metadata"), array[3]);
var __runInitializers$1 = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement$1 = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings$1[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc$1(k < 4 ? target : { get [name]() {
    return __privateGet$1(this, extra);
  }, set [name](x) {
    return __privateSet$1(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name$1(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name$1(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext$1(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn$1(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet$1 : __privateMethod$1)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet$1(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn$1(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError$1("Object expected");
    else __expectFn$1(fn = it.get) && (desc.get = fn), __expectFn$1(fn = it.set) && (desc.set = fn), __expectFn$1(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata$1(array, target), desc && __defProp$1(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __accessCheck$1 = (obj, member, msg) => member.has(obj) || __typeError$1("Cannot " + msg);
var __privateIn$1 = (member, obj) => Object(obj) !== obj ? __typeError$1('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet$1 = (obj, member, getter) => (__accessCheck$1(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd$1 = (obj, member, value) => member.has(obj) ? __typeError$1("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet$1 = (obj, member, value, setter) => (__accessCheck$1(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod$1 = (obj, member, method) => (__accessCheck$1(obj, member, "access private method"), method);
var _firstCustomIndex_dec, _get_dec, _total_dec, _existing, _firstCustomIndex, _init$1;
class SongInstruments {
  constructor() {
    __runInitializers$1(_init$1, 5, this);
    /**
     * {@inheritDoc SongInstruments#get}
     */
    __privateAdd$1(this, _existing, { ...Instrument.builtIn });
    // TODO: Only import the number of instruments defined by the NBS version
    /**
     * {@inheritDoc SongInstruments#firstCustomIndex}
     */
    __privateAdd$1(this, _firstCustomIndex, +Object.keys(Instrument.builtIn).at(-1) + 1);
  }
  get total() {
    return Object.keys(__privateGet$1(this, _existing)).length;
  }
  get get() {
    return Object.freeze({ ...__privateGet$1(this, _existing) });
  }
  get firstCustomIndex() {
    return __privateGet$1(this, _firstCustomIndex);
  }
  /**
   * Set an existing {@linkcode Instrument} at an ID.
   *
   * @remarks Any existing instrument with the same ID as the added instrument will be overwritten.
   * @see Built-in instruments cannot be modified!
   * @param id ID of the instrument to be set
   */
  set(id, instrument) {
    const existingInstrument = __privateGet$1(this, _existing)[id];
    if (existingInstrument?.isBuiltIn) {
      console.warn("Built-in instruments cannot be modified!");
      return;
    }
    if (!__privateGet$1(this, _existing)[id - 1]) {
      throw new Error("Instrument cannot be set out of order! There must be an instrument before or on this ID.");
    }
    __privateGet$1(this, _existing)[id] = instrument;
    return instrument;
  }
  /**
   * Add an existing {@linkcode Instrument}.
   *
   * @param instrument Instrument to add
   */
  add(instrument) {
    return this.set(this.total, instrument);
  }
  /**
   * Create and add an {@linkcode Instrument}.
   *
   * @param options Options for the instrument
   */
  create(options) {
    const instrument = new Instrument(options);
    return this.add(instrument);
  }
  /**
   * Delete an {@linkcode Instrument}.
   *
   * @see Built-in instruments cannot be delted!
   * @param id ID of the instrument to be deleted
   */
  delete(id) {
    const existingInstrument = __privateGet$1(this, _existing)[id];
    if (existingInstrument?.isBuiltIn) {
      console.warn("Built-in instruments cannot be deleted!");
      return;
    }
    delete __privateGet$1(this, _existing)[id];
  }
  /**
   * Iterate each id-instrument pair.
   */
  *[(_total_dec = [enumerable, readOnly], _get_dec = [enumerable, readOnly], _firstCustomIndex_dec = [enumerable, readOnly], Symbol.iterator)]() {
    for (const [id, instrument] of Object.entries(__privateGet$1(this, _existing))) {
      yield [+id, instrument];
    }
  }
}
_init$1 = __decoratorStart$1(null);
_existing = new WeakMap();
_firstCustomIndex = new WeakMap();
__decorateElement$1(_init$1, 2, "total", _total_dec, SongInstruments);
__decorateElement$1(_init$1, 2, "get", _get_dec, SongInstruments);
__decorateElement$1(_init$1, 2, "firstCustomIndex", _firstCustomIndex_dec, SongInstruments);
__decoratorMetadata$1(_init$1, SongInstruments);

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __decoratorStart = (base) => [, , , __create(base?.[__knownSymbol("metadata")] ?? null)];
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc(k < 4 ? target : { get [name]() {
    return __privateGet(this, extra);
  }, set [name](x) {
    return __privateSet(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet : __privateMethod)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _layers_dec, _instruments_dec, _hasSolo_dec, _timePerTick_dec, _tempo_dec, _lastMeasure_dec, _duration_dec, _autoSave_dec, _loop_dec, _length_dec, _loop, _autoSave, _tempo, _timePerTick, _layers, _instruments, _init;
const defaultAutoSave = {
  "enabled": false,
  "interval": 10
};
const defaultLoop = {
  "enabled": false,
  "startTick": 0,
  "totalLoops": 0
};
_length_dec = [enumerable, readOnly], _loop_dec = [enumerable, readOnly], _autoSave_dec = [enumerable, readOnly], _duration_dec = [enumerable, readOnly], _lastMeasure_dec = [enumerable, readOnly], _tempo_dec = [enumerable], _timePerTick_dec = [enumerable], _hasSolo_dec = [enumerable, readOnly], _instruments_dec = [enumerable, readOnly], _layers_dec = [enumerable, readOnly];
class Song {
  constructor() {
    __runInitializers(_init, 5, this);
    /**
     * {@inheritDoc Song#loop}
     */
    __privateAdd(this, _loop, { ...defaultLoop });
    /**
     * {@inheritDoc Song#autoSave}
     */
    __privateAdd(this, _autoSave, { ...defaultAutoSave });
    /**
     * {@inheritDoc Song#tempo}
     */
    __privateAdd(this, _tempo, 10);
    /**
     * {@inheritDoc Song#timePerTick}
     */
    __privateAdd(this, _timePerTick, 100);
    /**
     * {@inheritDoc Song#layers}
     */
    __privateAdd(this, _layers, new SongLayers());
    /**
     * {@inheritDoc Song#instruments}
     */
    __privateAdd(this, _instruments, new SongInstruments());
    /**
     * Version of NBS the song has been saved to.
     *
     * @see https://opennbs.org/nbs
     */
    __publicField(this, "nbsVersion", 5);
    /**
     * Name of the song.
     */
    __publicField(this, "name");
    /**
     * Author of the song.
     */
    __publicField(this, "author");
    /**
     * Original author of the song.
     */
    __publicField(this, "originalAuthor");
    /**
     * Description of the song.
     */
    __publicField(this, "description");
    /**
     * Imported MIDI/Schematic file name.
     */
    __publicField(this, "importName");
    /**
     * Number of minutes spent on the song.
     */
    __publicField(this, "minutesSpent", 0);
    /**
     * Number of times the user has left-clicked on the song.
     */
    __publicField(this, "leftClicks", 0);
    /**
     * Number of times the user has right-clicked on the song.
     */
    __publicField(this, "rightClicks", 0);
    /**
     * Number of times the user has added a note block.
     */
    __publicField(this, "blocksAdded", 0);
    /**
     * Number of times the user have removed a note block.
     */
    __publicField(this, "blocksRemoved", 0);
    /**
     * Time signature of the song.
     *
     * @example If this is 3, then the signature is 3/4. This value ranges from 2-8.
     */
    __publicField(this, "timeSignature", 4);
  }
  get length() {
    let farthestTick = 0;
    for (const layer of __privateGet(this, _layers).get) {
      const lastNote = +Object.keys(layer.notes.get).at(-1);
      if (lastNote > farthestTick) {
        farthestTick = lastNote;
      }
    }
    return farthestTick;
  }
  get loop() {
    return __privateGet(this, _loop);
  }
  get autoSave() {
    return __privateGet(this, _autoSave);
  }
  get duration() {
    return this.length * __privateGet(this, _timePerTick);
  }
  get lastMeasure() {
    return Math.ceil(this.length / this.timeSignature) * this.timeSignature;
  }
  get tempo() {
    return __privateGet(this, _tempo);
  }
  /**
   * @remarks Adjusts the {@link Song#timePerTick | time per tick} upon modification.
   */
  set tempo(value) {
    __privateSet(this, _tempo, value);
    __privateSet(this, _timePerTick, 20 / value * 50);
  }
  get timePerTick() {
    return __privateGet(this, _timePerTick);
  }
  /**
   * @remarks Adjusts the {@link Song#tempo | tempo} upon modification.
   */
  set timePerTick(value) {
    __privateSet(this, _timePerTick, value);
    __privateSet(this, _tempo, 50 / value * 20);
  }
  get hasSolo() {
    let found = false;
    for (const layer of __privateGet(this, _layers).get) {
      if (layer.isSolo) {
        found = true;
        break;
      }
    }
    return found;
  }
  get instruments() {
    return __privateGet(this, _instruments);
  }
  get layers() {
    return __privateGet(this, _layers);
  }
}
_init = __decoratorStart(null);
_loop = new WeakMap();
_autoSave = new WeakMap();
_tempo = new WeakMap();
_timePerTick = new WeakMap();
_layers = new WeakMap();
_instruments = new WeakMap();
__decorateElement(_init, 2, "length", _length_dec, Song);
__decorateElement(_init, 2, "loop", _loop_dec, Song);
__decorateElement(_init, 2, "autoSave", _autoSave_dec, Song);
__decorateElement(_init, 2, "duration", _duration_dec, Song);
__decorateElement(_init, 2, "lastMeasure", _lastMeasure_dec, Song);
__decorateElement(_init, 2, "tempo", _tempo_dec, Song);
__decorateElement(_init, 2, "timePerTick", _timePerTick_dec, Song);
__decorateElement(_init, 2, "hasSolo", _hasSolo_dec, Song);
__decorateElement(_init, 2, "instruments", _instruments_dec, Song);
__decorateElement(_init, 2, "layers", _layers_dec, Song);
__decoratorMetadata(_init, Song);

function omitEmptyLayers(song, makeClone = true) {
  let workingClass = song;
  if (makeClone) {
    workingClass = Object.assign({}, song);
    Object.setPrototypeOf(workingClass, Song.prototype);
  }
  for (let i = workingClass.layers.total - 1; i > 0; i--) {
    if (workingClass.layers.get[i].notes.total !== 0) {
      continue;
    }
    workingClass.layers.delete(i);
  }
  return workingClass;
}

const defaultToArrayBufferOptions = {
  "ignoreEmptyLayers": false
};
function toArrayBuffer(song, options = defaultToArrayBufferOptions) {
  let workingClass = song;
  if (options.ignoreEmptyLayers) {
    workingClass = omitEmptyLayers(song);
  }
  const size = write(workingClass, 0, true).nextByte;
  return write(workingClass, size).buffer;
}
function write(song, size, dry = false) {
  const writer = new BufferWriter(new ArrayBuffer(size), dry);
  if (song.nbsVersion >= 1) {
    writer.writeShort(0);
    writer.writeByte(song.nbsVersion);
    writer.writeByte(song.instruments.firstCustomIndex);
  }
  if (song.nbsVersion === 0 || song.nbsVersion >= 3) {
    writer.writeShort(song.length);
  }
  writer.writeShort(song.layers.total);
  writer.writeString(song.name ?? "");
  writer.writeString(song.author ?? "");
  writer.writeString(song.originalAuthor ?? "");
  writer.writeString(song.description ?? "");
  writer.writeShort(song.tempo * 100);
  writer.writeByte(+song.autoSave.enabled);
  writer.writeByte(song.autoSave.interval);
  writer.writeByte(song.timeSignature);
  writer.writeInt(Math.floor(song.minutesSpent));
  writer.writeInt(song.leftClicks);
  writer.writeInt(song.rightClicks);
  writer.writeInt(song.blocksAdded);
  writer.writeInt(song.blocksRemoved);
  writer.writeString(song.importName ?? "");
  if (song.nbsVersion >= 4) {
    writer.writeByte(+song.loop.enabled);
    writer.writeByte(song.loop.totalLoops);
    writer.writeByte(song.loop.startTick);
  }
  writer.writeByte(0);
  let currentTick = -1;
  for (let i = 0; i <= song.length; i++) {
    let hasNotes = false;
    for (const layer of song.layers.get) {
      if (layer.notes.get[i]) {
        hasNotes = true;
        break;
      }
    }
    if (!hasNotes) {
      continue;
    }
    const jumpTicks = i - currentTick;
    currentTick = i;
    writer.writeShort(jumpTicks);
    let currentLayer = -1;
    for (let j = 0; j < song.layers.total; j++) {
      const layer = song.layers.get[j];
      const note = layer.notes.get[i];
      if (note) {
        const jumpLayers = j - currentLayer;
        currentLayer = j;
        writer.writeShort(jumpLayers);
        writer.writeByte(note.instrument);
        writer.writeByte(note.key);
        if (song.nbsVersion >= 4) {
          writer.writeByte(note.velocity);
          writer.writeUnsignedByte((note.panning ?? 0) + 100);
          writer.writeShort(note.pitch);
        }
      }
    }
    writer.writeShort(0);
  }
  writer.writeShort(0);
  for (const layer of song.layers.get) {
    writer.writeString(layer.name ?? "");
    if (song.nbsVersion >= 4) {
      let lock = 0;
      if (layer.isLocked) {
        lock = 1;
      }
      if (layer.isSolo) {
        lock = 2;
      }
      writer.writeByte(lock);
    }
    writer.writeByte(layer.volume);
    if (song.nbsVersion >= 2) {
      writer.writeByte(layer.stereo + 100);
    }
  }
  const totalInstruments = Object.keys(song.instruments.get).length;
  writer.writeByte(totalInstruments - song.instruments.firstCustomIndex);
  for (let i = 0; i < totalInstruments; i++) {
    const instrument = song.instruments.get[i];
    if (!instrument.isBuiltIn) {
      writer.writeString(instrument.name ?? "");
      writer.writeString(instrument.soundFile);
      writer.writeByte(instrument.key);
      writer.writeByte(+(instrument.pressKey ?? 0));
    }
  }
  return writer;
}

const ignoredValues = {
  "pressKey": false,
  "isLocked": false,
  "isSolo": false,
  "volume": 0,
  "stereo": 0,
  "velocity": 100,
  "panning": 0,
  "pitch": 0,
  "isBuiltIn": true
};
function toJSON(song) {
  const workingClass = omitEmptyLayers(song);
  return JSON.parse(
    JSON.stringify(workingClass, (key, value) => {
      if (ignoredValues[key] !== void 0) {
        if (value === ignoredValues[key]) {
          return;
        }
      }
      return value;
    })
  );
}

const defaultFromArrayBufferOptions = {
  "ignoreEmptyLayers": false
};
function fromArrayBuffer(arrayBuffer, options = defaultFromArrayBufferOptions) {
  const song = new Song();
  const reader = new BufferReader(arrayBuffer);
  let size = reader.readShort();
  if (size === 0) {
    song.nbsVersion = reader.readByte();
    reader.readByte();
    if (song.nbsVersion >= 3) {
      size = reader.readShort();
    }
  } else {
    song.nbsVersion = 0;
  }
  if (song.nbsVersion > 5) {
    throw new Error("This library does not support Note Block Songs created with versions greater than 5.");
  }
  const totalLayers = reader.readShort();
  song.name = reader.readString();
  song.author = reader.readString();
  song.originalAuthor = reader.readString();
  song.description = reader.readString();
  song.tempo = reader.readShort() / 100;
  song.autoSave.enabled = Boolean(reader.readByte());
  song.autoSave.interval = reader.readByte();
  song.timeSignature = reader.readByte();
  song.minutesSpent = reader.readInt();
  song.leftClicks = reader.readInt();
  song.rightClicks = reader.readInt();
  song.blocksAdded = reader.readInt();
  song.blocksRemoved = reader.readInt();
  song.importName = reader.readString();
  for (const key of ["name", "author", "originalAuthor", "description", "importName"]) {
    if (song[key] !== "") {
      continue;
    }
    song[key] = void 0;
  }
  if (song.nbsVersion >= 4) {
    song.loop.enabled = Boolean(reader.readByte());
    song.loop.totalLoops = reader.readByte();
    song.loop.startTick = reader.readShort();
  }
  const rawNotes = [];
  let tick = -1;
  while (true) {
    const jumpTicks = reader.readShort();
    if (jumpTicks === 0) {
      break;
    }
    tick += jumpTicks;
    let layer = -1;
    while (true) {
      const jumpLayers = reader.readShort();
      if (jumpLayers === 0) {
        break;
      }
      layer += jumpLayers;
      const instrument = reader.readByte();
      const key = reader.readByte();
      let velocity = 100;
      let panning = 0;
      let pitch = 0;
      if (song.nbsVersion >= 4) {
        velocity = reader.readByte();
        panning = reader.readUnsingedByte() - 100;
        pitch = reader.readShort();
      }
      rawNotes.push({
        "instrument": instrument,
        "key": key,
        "velocity": velocity,
        "panning": panning,
        "pitch": pitch,
        "layer": layer,
        "tick": tick
      });
    }
  }
  if (song.nbsVersion > 0 && song.nbsVersion < 3) {
    size = tick;
  }
  if (arrayBuffer.byteLength > reader.nextByte) {
    for (let i = 0; i < totalLayers; i++) {
      const layer = song.layers.create();
      const name = reader.readString();
      layer.name = name === "" ? void 0 : name;
      if (song.nbsVersion >= 4) {
        const lock = reader.readByte();
        if (lock === 1) {
          layer.isLocked = true;
        }
        if (lock === 2) {
          layer.isSolo = true;
        }
      }
      layer.volume = reader.readByte();
      let panning = 0;
      if (song.nbsVersion >= 2) {
        panning = reader.readUnsingedByte() - 100;
      }
      layer.stereo = panning;
    }
  }
  const customInstruments = reader.readByte();
  for (let i = 0; i < customInstruments; i++) {
    const name = reader.readString();
    song.instruments.set(
      song.instruments.firstCustomIndex + i,
      new Instrument({
        "name": name === "" ? void 0 : name,
        "soundFile": reader.readString(),
        // Read instrument file
        "key": reader.readByte(),
        // Read instrument pitch
        "pressKey": Boolean(reader.readByte())
        // Read press key status
      })
    );
  }
  for (const rawNote of rawNotes) {
    let layer = song.layers.get[rawNote.layer];
    if (!layer) {
      layer = song.layers.create();
    }
    layer.notes.create(rawNote.tick, rawNote.instrument, {
      "key": rawNote.key,
      "panning": rawNote.panning,
      "pitch": rawNote.pitch,
      "velocity": rawNote.velocity
    });
  }
  return options.ignoreEmptyLayers ? omitEmptyLayers(song, false) : song;
}

function iterateKeys(ignored, songObject, object) {
  for (const key of Object.keys(object)) {
    if (ignored.includes(key)) {
      continue;
    }
    const songType = typeof songObject[key];
    const objectType = typeof object[key];
    if (songType === "object" && objectType === "object") {
      iterateKeys(ignored, songObject[key], object[key]);
      continue;
    }
    if (songType !== "undefined" && songType !== objectType) {
      continue;
    }
    songObject[key] = object[key];
  }
}
function getterIs(condition, then, object, key) {
  if (key in object && typeof object[key] === "object" && "get" in object[key]) {
    if (condition(object[key].get)) {
      then(object[key].get);
    }
  }
}
function fromJSON(json) {
  if (typeof json !== "object") {
    throw new Error("Provided argument is not a valid JSON object!");
  }
  const song = new Song();
  const ignoredProperties = [];
  const prototype = Object.getPrototypeOf(song);
  for (const key of Object.getOwnPropertyNames(prototype)) {
    if (key === "loop" || key === "autoSave") {
      continue;
    }
    const descriptor = Object.getOwnPropertyDescriptor(song, key);
    if (descriptor && typeof descriptor.set === "function") {
      ignoredProperties.push(key);
    }
  }
  iterateKeys(ignoredProperties, song, json);
  if ("tempo" in json && typeof json.tempo === "number") {
    song.tempo = json.tempo;
  } else if ("timePerTick" in json && typeof json.timePerTick === "number") {
    song.timePerTick = json.timePerTick;
  }
  getterIs(
    Array.isArray,
    (value) => {
      for (const layer of value) {
        const songLayer = new Layer(layer);
        getterIs(
          (value2) => {
            return typeof value2 === "object";
          },
          (value2) => {
            for (const [id, note] of Object.entries(value2)) {
              if (typeof note !== "object") {
                continue;
              }
              if (!("instrument" in note) || typeof note.instrument !== "number") {
                continue;
              }
              songLayer.notes.set(+id, new Note(note.instrument, note));
            }
          },
          layer,
          "notes"
        );
        song.layers.add(songLayer);
      }
    },
    json,
    "layers"
  );
  getterIs(
    (value) => {
      return typeof value === "object";
    },
    (value) => {
      const instruments = Object.entries(value);
      if (instruments.length > Object.keys(Instrument.builtIn).length) {
        for (const [id, instrument] of instruments) {
          if (!("isBuiltIn" in instrument) || instrument.isBuiltIn === "true") {
            continue;
          }
          song.instruments.set(+id, new Instrument(instrument));
        }
      }
    },
    json,
    "instruments"
  );
  return song;
}

export { BufferReader, BufferWrapper, BufferWriter, IllegalSetError, Instrument, Layer, LayerNotes, Note, Song, SongInstruments, SongLayers, builtInBuilder, defaultAutoSave, defaultFromArrayBufferOptions, defaultInstrumentOptions, defaultLayerOptions, defaultLoop, defaultNoteOptions, defaultToArrayBufferOptions, enumerable, fromArrayBuffer, fromJSON, ignoredValues, omitEmptyLayers, readOnly, toArrayBuffer, toJSON };
