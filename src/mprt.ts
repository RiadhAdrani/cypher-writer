import { isBlank, wrap } from "@riadh-adrani/utility-js";
import stmt from "./stmt";

/**
 * create an import statement.
 * @param objects items to be imported
 * @param from source path
 * @param useRequire import using common.js syntax : `const x = require()`
 */
export default (objects: string | Array<string>, from: string, useRequire?: boolean): string => {
    let obj;

    if (isBlank(from)) {
        throw "import (from) should be a non-empty string.";
    }

    if (Array.isArray(objects)) {
        obj = wrap(objects.filter((item) => !isBlank(item)).join(","), "{", "}");
    } else if (!isBlank(objects)) {
        obj = objects;
    } else {
        throw "import( objects) should be a non-empty string or an array of strings.";
    }

    return stmt(useRequire ? `const ${obj} = require('${from}')` : `import ${obj} from '${from}'`);
};
