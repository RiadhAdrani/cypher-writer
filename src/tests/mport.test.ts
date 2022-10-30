import { describe, it, expect } from "@jest/globals";
import mport from "../mprt";

describe("Export", () => {
    it.each([[""], [null], [undefined], [{}]])("should throw an error", (from) => {
        expect(() => mport("Obj", from as string)).toThrow();
    });

    it.each([[""], [null], [undefined], [{}]])("should throw an error", (objects) => {
        expect(() => mport(objects as string, "./file.js")).toThrow();
    });

    it.each([
        ["Obj", "./file.js", false, "import Obj from './file.js';"],
        [["Obj"], "./file.js", false, "import {Obj} from './file.js';"],
        [["Obj", "Item"], "./file.js", false, "import {Obj,Item} from './file.js';"],
        ["Obj", "./file.js", true, "const Obj = require('./file.js');"],
        [["Obj"], "./file.js", true, "const {Obj} = require('./file.js');"],
        [["Obj", "Item"], "./file.js", true, "const {Obj,Item} = require('./file.js');"],
    ])("should render an export statement", (objects, from, useRequire, expected) => {
        expect(mport(objects, from, useRequire)).toBe(expected);
    });
});
