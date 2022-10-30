import { describe, it, expect } from "@jest/globals";
import variable from "../variable";

describe("Variable", () => {
    it.each([[undefined], [null], [1], [""], [" "]])("should render statements", (keyword) => {
        expect(() => variable(keyword as string, "name")).toThrow();
    });

    it.each([[undefined], [null], [1], [""], [" "]])("should render statements", (name) => {
        expect(() => variable("let", name as string)).toThrow();
    });

    it("should render a variable", () => {
        expect(variable("let", "name")).toBe("let name;");
    });

    it("should render add type", () => {
        expect(variable("let", "name", undefined, "string")).toBe("let name : string;");
    });

    it("should render add value", () => {
        expect(variable("let", "name", "'variable'")).toBe("let name = 'variable';");
    });
});
