import { isBlank, wrap } from "@riadh-adrani/utility-js";
import stmt from "./stmt";

export default (
    objects: string | Array<string>,
    isDefault?: boolean,
    isCommonJs?: boolean
): string => {
    if (Array.isArray(objects)) {
        const items = wrap(objects.filter((item) => !isBlank(item)).join(","), "{", "}");

        if (isCommonJs) {
            return stmt(`module.exports = ${items}`);
        } else {
            return stmt(isDefault ? `export default ${items}` : `export ${items}`);
        }
    } else if (!isBlank(objects)) {
        if (isCommonJs) {
            return stmt(`module.exports = ${objects}`);
        } else {
            return stmt(isDefault ? `export default ${objects}` : `export {${objects}}`);
        }
    } else {
        throw "export (objects) should be a non-empty string or an array";
    }
};
