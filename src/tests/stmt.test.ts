import { describe, it, expect } from "@jest/globals";
import stmt from "../stmt";

describe("Statements", () => {
    it.each([
        [undefined, ""],
        [null, ""],
        [1, ""],
        [[], ""],
        [{}, ""],
        [" ", ""],
        ["x", "x;"],
        ["const x = 10", "const x = 10;"],
        [[""], ""],
        [
            ["const a = 10", "const b = 20", "const c = a + b"],
            "const a = 10;const b = 20;const c = a + b;",
        ],
        [
            ["const a = 10", "", "const b = 20", null, undefined, "const c = a + b"],
            "const a = 10;const b = 20;const c = a + b;",
        ],
    ])("should render statements", (statement, expected) => {
        expect(stmt(statement as string)).toBe(expected);
    });
});
