import { isBlank } from "@riadh-adrani/utility-js";
import stmt from "./stmt";

export default (keyword: string, name: string, value?: string, type?: string) => {
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
