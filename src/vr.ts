import variable from "./variable";

/**
 * create a variable assignment with `var`.
 * @param name identifier
 * @param value initial value
 * @param type type
 */
export default (name: string, value?: string, type?: string): string => {
    return variable("var", name, value, type);
};
