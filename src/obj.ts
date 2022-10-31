import { isBlank, wrap } from "@riadh-adrani/utility-js";
import stmt from "./stmt";

/**
 * Create a Javascript object with the given items.
 * @param items key value pairs as a string. use `key`.
 */
export default (items: Array<string>) => {
    const content = Array.isArray(items) ? items.filter((item) => !isBlank(item)).join(",") : "";

    return stmt(wrap(content, "{", "}"));
};
