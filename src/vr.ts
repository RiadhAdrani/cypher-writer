import variable from "./variable";

export default (name: string, value?: string, type?: string) => {
    return variable("var", name, value, type);
};
