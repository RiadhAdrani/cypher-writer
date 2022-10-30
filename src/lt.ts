import variable from "./variable";

/**
 * create a variable assignment with `let`.
 * @param name identifier
 * @param value initial value
 * @param type type
 */
export default (name: string, value?: string, type?: string): string => {
    return variable("let", name, value, type);
};
