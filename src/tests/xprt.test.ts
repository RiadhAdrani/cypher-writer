import { describe, it, expect } from "@jest/globals";
import xprt from "../xprt";

describe("Export", () => {
    it.each([[""], [null], [undefined], [{}]])("should throw an error", (objects) => {
        expect(() => xprt(objects as string)).toThrow();
    });

    it.each([
        ["myFunction", false, false, "export {myFunction};"],
        ["myFunction", true, false, "export default myFunction;"],
        ["myFunction", true, true, "module.exports = myFunction;"],
        [[], false, false, "export {};"],
        [["myFunction"], false, false, "export {myFunction};"],
        [["myFunction", "AnotherFunction"], false, false, "export {myFunction,AnotherFunction};"],
        [["myFunction"], true, false, "export default {myFunction};"],
        [["myFunction"], true, true, "module.exports = {myFunction};"],
    ])("should render an export statement", (objects, isDefault, isCommonJs, expected) => {
        expect(xprt(objects, isDefault, isCommonJs)).toBe(expected);
    });
});
