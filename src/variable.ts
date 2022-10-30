import { isBlank } from "@riadh-adrani/utility-js";
import stmt from "./stmt";

/**
 * create a variable assignment with the given keyword.
 * @param keyword keyword
 * @param name identifier
 * @param value value
 * @param type type
 */
export default (keyword: string, name: string, value?: string, type?: string): string => {
    if (isBlank(keyword)) throw "variable (keyword) cannot be empty";
    if (isBlank(name)) throw "variable (name) cannot be empty";

    let output = `${keyword} ${name}`;

    if (!isBlank(type as string)) {
        output += ` : ${type}`;
    }

    if (!isBlank(value as string)) {
        output += ` = ${value}`;
    }

    return stmt(output);
};
