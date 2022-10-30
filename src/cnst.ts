import { isBlank } from "@riadh-adrani/utility-js";
import variable from "./variable";

export default (name: string, value: string, type?: string) => {
    if (isBlank(value)) throw "const should have a (value)";

    return variable("const", name, value, type);
};
