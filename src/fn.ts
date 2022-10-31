import { isBlank, wrap } from "@riadh-adrani/utility-js";
import stmt from "./stmt";

export interface FunctionParams {
    /**
     * abstract function used in classes
     */
    isAbstract?: boolean;
    /**
     * render a normal function in Typescript with return type.
     *
     */
    isTypescript?: boolean;
    /**
     * render a function declaration ignoring the body content.
     */
    isDeclaration?: boolean;
    /**
     * render an arrow function, which will be of form:
     * ```
     * const fn = () => {}
     * ```
     */
    isArrowFunction?: boolean;
    /**
     * add decorators at the top of the function.
     *
     * only available in Typescript or Declaration mode.
     */
    decorators?: Array<string>;
    /**
     * add async keyword.
     */
    async?: boolean;
    /**
     * function name.
     */
    name?: string;
    /**
     * type parameters.
     * ```
     * function fn<T>(x:T):void
     * ```
     * only available in Typescript or Declaration or Abstract mode.
     */
    typeParameters?: Array<string>;
    /**
     * function parameters/arguments.
     */
    parameters?: Array<string>;
    /**
     * function body statements. semi-colon `;` will be added automatically.
     */
    body?: Array<string>;
    /**
     * return type.
     *
     * only available in Typescript or Declaration mode.
     */
    returnType?: string;
    /**
     * create a callback instead.
     */
    isCallback?: boolean;
}

/**
 * generate code for a function as an array of strings.
 * @param params parameters
 */
export default (params: FunctionParams): string => {
    if (isBlank(params.name as string) && !params.isCallback)
        throw "function (name) should be a non-empty string.";

    const _decorators = Array.isArray(params.decorators)
        ? params.decorators.filter((item) => !isBlank(item)).join(" ")
        : "";

    const _name = (params.name as string).trim();

    if (_name.includes(" ")) throw "function (name) cannot contain white spaces.";

    const _typeParameters = Array.isArray(params.typeParameters)
        ? wrap(params.typeParameters.filter((item) => !isBlank(item)).join(","), "<", ">")
        : "";

    const _parameters = Array.isArray(params.parameters)
        ? wrap(params.parameters.filter((item) => !isBlank(item)).join(","), "(", ")")
        : "()";

    const _body = Array.isArray(params.body)
        ? wrap(
              params.body
                  .filter((item) => !isBlank(item))
                  .map((item) => stmt(item))
                  .join(""),
              "{",
              "}"
          )
        : "{}";

    const _returnType = isBlank(params.returnType!) ? "void" : params.returnType!;

    const isDeclaration = params.isDeclaration === true;
    const isTypescript = params.isTypescript === true;
    const isArrowFunction = params.isArrowFunction === true;
    const isAbstract = params.isAbstract === true;

    const output: Array<string> = [];

    if (!isBlank(_decorators)) {
        output.push(_decorators);
    }

    if (isArrowFunction) {
        output.push("const", _name, "=");
    }

    if (isAbstract) {
        output.push("abstract");
    }

    if (params.async) {
        output.push("async");
    }

    if (!isArrowFunction && !isAbstract) {
        output.push("function");
    }

    if (!isArrowFunction) {
        output.push(_name);
    }

    if (!isBlank(_typeParameters)) {
        output.push(_typeParameters);
    }

    if (!isBlank(_parameters)) {
        output.push(_parameters);
    }

    if ((isDeclaration || isTypescript) && !isBlank(_returnType)) {
        output.push(":", _returnType);
    }

    if (isArrowFunction && !isDeclaration && !isAbstract) {
        output.push("=>");
    }

    if (!isDeclaration && !isAbstract) {
        output.push(_body);
    }

    return stmt(output.filter((seg) => !isBlank(seg)).join(" "));
};
