import { describe, it, expect } from "@jest/globals";
import key from "../key";

describe("Key", () => {
    it.each([[""], [null], [undefined], [{}]])("should throw an error", (type) => {
        expect(() => key("name", type as string)).toThrow();
    });

    it.each([[""], [[""]], [null], [undefined], [{}]])("should throw an error", (name) => {
        expect(() => key(name as string, "string")).toThrow();
    });

    it.each([
        ["key", "string", "key: string"],
        ["key", ["string"], "key: string"],
        ["key", ["string", "number"], "key: string|number"],
    ])("should render an export statement", (name, type, expected) => {
        expect(key(name, type)).toBe(expected);
    });
});
