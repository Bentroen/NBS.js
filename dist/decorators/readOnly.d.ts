/**
 * Context for {@linkcode readOnly}.
 *
 * @category Internal Utilities
 * @internal
 */
export interface SetterDecoratorContext {
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
export declare function readOnly<T>(getFunction: () => T, { name, addInitializer }: SetterDecoratorContext): () => T;
