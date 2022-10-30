import { isBlank } from "@riadh-adrani/utility-js";

/**
 * transform statements and add semi-colon `;` at the end.
 * @param statements a string or an array of strings representing the statements to be transformed.
 */
export default (statements: string | Array<string>): string => {
    if (Array.isArray(statements)) {
        return statements
            .filter((item) => !isBlank(item))
            .map((item) => item + ";")
            .join("");
    }

    return isBlank(statements) ? "" : statements.trim() + ";";
};
