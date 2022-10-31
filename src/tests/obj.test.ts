import obj from "../obj";

import { describe, it, expect } from "@jest/globals";

describe("Export", () => {
    it.each([
        ["obj", "{};"],
        [["obj"], "{obj};"],
        [[""], "{};"],
        [["obj:'red'"], "{obj:'red'};"],
        [["obj:'red'", "obj2:3"], "{obj:'red',obj2:3};"],
        [["obj:'red'", undefined, "obj2:3"], "{obj:'red',obj2:3};"],
    ])("should render an export statement", (items, expected) => {
        expect(obj(items as unknown as Array<string>)).toBe(expected);
    });
});
