import { isBlank } from "@riadh-adrani/utility-js";

/**
 * create documentation bloc.
 * @param lines documentation lines.
 */
export default (lines: Array<string>): string => {
    const _lines = Array.isArray(lines) ? lines.filter((item) => !isBlank(item)) : [];

    return ["/**", ..._lines.map((item) => `* ${item}`), "*/"].join("\n");
};
