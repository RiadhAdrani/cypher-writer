import { isBlank } from "@riadh-adrani/utility-js";
import variable from "./variable";

/**
 * create a constant assignment with `const`.
 * @param name identifier
 * @param value value
 * @param type type
 */
export default (name: string, value: string, type?: string): string => {
    if (isBlank(value)) throw "const should have a (value)";

    return variable("const", name, value, type);
};
