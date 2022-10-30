import { describe, it, expect } from "@jest/globals";
import docs from "../docs";

describe("Docs", () => {
    it.each([
        [undefined, "/**\n*/"],
        [null, "/**\n*/"],
        [1, "/**\n*/"],
        [[], "/**\n*/"],
        [{}, "/**\n*/"],
        ["Hello", "/**\n*/"],
        [["Hello"], "/**\n* Hello\n*/"],
        [["# Class", "a very interesting class"], "/**\n* # Class\n* a very interesting class\n*/"],
        [
            ["# Class", "", "a very interesting class", undefined],
            "/**\n* # Class\n* a very interesting class\n*/",
        ],
    ])("should render docs", (lines, expected) => {
        expect(docs(lines as Array<string>)).toBe(expected);
    });
});
