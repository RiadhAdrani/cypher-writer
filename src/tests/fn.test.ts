import { describe, it, expect } from "@jest/globals";
import fn from "../fn";

describe("function", () => {
    it.each([[null], [undefined], [0], [[]], [{}], [""], ["na me"]])(
        "should throw an error when name is empty or non string : `%s`",
        (name) => {
            expect(() => fn({ name: name as string })).toThrow();
        }
    );

    it.each([
        [undefined, "function name  () : void {}"],
        [null, "function name  () : void {}"],
        [1, "function name  () : void {}"],
        ["", "function name  () : void {}"],
        [["@controller"], "@controller function name  () : void {}"],
        [["@controller", undefined, "@module"], "@controller @module function name  () : void {}"],
    ])("should add decorators", (decorators, expected) => {
        expect(
            fn({
                name: "name",
                isTypescript: true,
                decorators: decorators as unknown as Array<string>,
            })
        ).toStrictEqual(expected);
    });

    it("should trim function name", () => {
        expect(fn({ name: " name " })).toStrictEqual("function name () {}");
    });

    it("should add async keyword", () => {
        expect(fn({ name: "name", async: true })).toStrictEqual("async function name () {}");
    });

    it.each([
        [undefined, "function name  () : void {}"],
        [null, "function name  () : void {}"],
        [1, "function name  () : void {}"],
        ["", "function name  () : void {}"],
        [["T"], "function name <T> () : void {}"],
        [["T", "K"], "function name <T,K> () : void {}"],
    ])("should add decorators", (typeParameters, expected) => {
        expect(
            fn({
                name: "name",
                isTypescript: true,
                typeParameters: typeParameters as unknown as Array<string>,
            })
        ).toStrictEqual(expected);
    });

    it.each([
        [undefined, "function name () {}"],
        [null, "function name () {}"],
        [1, "function name () {}"],
        ["", "function name () {}"],
        [["n", "m"], "function name (n,m) {}"],
    ])("should add parameters", (parameters, expected) => {
        expect(
            fn({
                name: "name",
                parameters: parameters as unknown as Array<string>,
            })
        ).toStrictEqual(expected);
    });

    it.each([
        [undefined, "function name () {}"],
        [null, "function name () {}"],
        [1, "function name () {}"],
        ["", "function name () {}"],
        [["const x = 10", "const y = x + 20"], "function name () {const x = 10;const y = x + 20;}"],
        [
            ["const x = 10", undefined, "const y = x + 20"],
            "function name () {const x = 10;const y = x + 20;}",
        ],
    ])("should add body statements", (body, expected) => {
        expect(
            fn({
                name: "name",
                body: body as unknown as Array<string>,
            })
        ).toStrictEqual(expected);
    });

    it.each([
        [undefined, "function name  () : void {}"],
        [null, "function name  () : void {}"],
        [1, "function name  () : void {}"],
        ["", "function name  () : void {}"],
        [[], "function name  () : void {}"],
        ["T", "function name  () : T {}"],
        ["Array<string>", "function name  () : Array<string> {}"],
        ["[string,number]", "function name  () : [string,number] {}"],
    ])("should add return type", (returnType, expected) => {
        expect(
            fn({
                name: "name",
                isTypescript: true,
                returnType: returnType as unknown as string,
            })
        ).toStrictEqual(expected);
    });

    it("should render as a javascript arrow function", () => {
        expect(
            fn({
                name: "name",
                isArrowFunction: true,
                async: true,
                parameters: ["number1", "number2"],
                body: ["return number1 + number2"],
            })
        ).toStrictEqual("const name = async (number1,number2) => {return number1 + number2;}");
    });

    it("should render as a typescript arrow function", () => {
        expect(
            fn({
                isTypescript: true,
                name: "name",
                isArrowFunction: true,
                async: true,
                typeParameters: ["T", "K", "M"],
                parameters: ["number1 : K", "number2 : M"],
                returnType: "T",
                body: ["return number1 + number2"],
            })
        ).toStrictEqual(
            "const name = async <T,K,M> (number1 : K,number2 : M) : T => {return number1 + number2;}"
        );
    });

    it("should render as a declaration arrow function", () => {
        expect(
            fn({
                isTypescript: true,
                isDeclaration: true,
                name: "name",
                isArrowFunction: true,
                async: true,
                typeParameters: ["T", "K", "M"],
                parameters: ["number1 : K", "number2 : M"],
                returnType: "T",
                body: ["return number1 + number2"],
            })
        ).toStrictEqual("const name = async <T,K,M> (number1 : K,number2 : M) : T");
    });

    it("should render an abstract function", () => {
        expect(
            fn({
                isAbstract: true,
                isTypescript: true,
                name: "name",
                async: true,
                typeParameters: ["T", "K", "M"],
                parameters: ["number1 : K", "number2 : M"],
                returnType: "T",
                body: ["return number1 + number2"],
            })
        ).toStrictEqual("abstract async name <T,K,M> (number1 : K,number2 : M) : T");
    });
});
