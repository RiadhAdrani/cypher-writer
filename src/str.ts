import { wrap } from "@riadh-adrani/utility-js";

export type StringType = '"' | "'" | "`";

/**
 * create a string.
 */
export default (str: string, type?: StringType) => {
    const wrapper = (() => {
        switch (type) {
            case '"':
                return '"';
            case "`":
                return "`";
            case "'":
                return "'";
            default:
                return '"';
        }
    })();

    return wrap(str, wrapper, wrapper);
};
