import rray from "../rray";

import { describe, it, expect } from "@jest/globals";

describe("Array", () => {
    it.each([
        ["obj", "[];"],
        [["obj"], "[obj];"],
        [[""], "[];"],
        [["obj:'red'"], "[obj:'red'];"],
        [["obj:'red'", "obj2:3"], "[obj:'red',obj2:3];"],
        [["obj:'red'", undefined, "obj2:3"], "[obj:'red',obj2:3];"],
    ])("should render an array", (items, expected) => {
        expect(rray(items as unknown as Array<string>)).toBe(expected);
    });
});
