import { isBlank } from "@riadh-adrani/utility-js";

/**
 * create a key to be used within an object or interface or a Typescript function or callback.
 *
 * It does not add `;` or `,` at the end.
 *
 * @param name identifier
 * @param type key value or type. defaulted to `any`.
 */
export default (name: string, type: string | Array<string>): string => {
    if (isBlank(name)) {
        throw "key (name) should be a non-empty string.";
    }

    const _types: string | undefined = Array.isArray(type)
        ? type.filter((item) => !isBlank(item)).join("|")
        : !isBlank(type)
        ? type
        : undefined;

    if (_types === undefined || isBlank(_types)) {
        throw "key (type) should be a non-empty string or an array of strings.";
    }

    return `${name}: ${_types}`;
};
