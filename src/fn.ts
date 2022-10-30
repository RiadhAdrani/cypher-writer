import { isBlank, wrap } from "@riadh-adrani/utility-js";

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
    name: string;
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
}

/**
 * generate code for a function as an array of strings.
 * @param params parameters
 */
export default (params: FunctionParams): Array<string> => {
    if (isBlank(params.name)) throw "function (name) should be a non-empty string.";

    const _decorators = Array.isArray(params.decorators)
        ? params.decorators.filter((item) => !isBlank(item)).join(" ")
        : "";

    const _name = params.name.trim();

    if (_name.includes(" ")) throw "function (name) cannot contain white spaces.";

    const _async = params.async === true ? "async" : "";

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
                  .map((item) => item + ";")
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

    const output = [];

    if (isAbstract) {
        const _header = ["abstract", _async, _name, _typeParameters, _parameters, ":", _returnType]
            .join(" ")
            .trim();

        output.push(_header);
    } else if (isTypescript || isDeclaration) {
        let _header = (
            isArrowFunction || isAbstract
                ? ["const", _name, "=", _async, _typeParameters, _parameters, ":", _returnType]
                : [_async, "function", _name, _typeParameters, _parameters, ":", _returnType]
        )
            .join(" ")
            .trim();

        if (!isBlank(_decorators)) output.push(_decorators);

        if (isArrowFunction && !isDeclaration) {
            _header += " =>";
        }

        output.push(_header);

        if (!isDeclaration && !isAbstract) {
            output.push(_body);
        }
    } else {
        const _header = (
            isArrowFunction
                ? ["const", _name, "=", _async, _parameters, "=>"]
                : [_async, "function", _name, _parameters]
        )
            .join(" ")
            .trim();

        output.push(_header, _body);
    }

    return output.filter((seg) => !isBlank(seg));
};
