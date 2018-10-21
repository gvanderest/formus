import React from "react";
import FormContext from "./FormContext";

interface IProps {
    name: string;
    onChange?(value: string | null): void;
    value?: string;
}

/**
 * Parse the name to figure out the name portion, and if it's an Array type.
 * @param name the field name, either "power" or "powers[]"
 * @returns [parsedName, nameIsArray]
 */
function parseName(name: string): [string, boolean] {
    if (name.endsWith("[]")) {
        return [name.replace("[]", ""), true];
    }
    return [name, false];
}

export class Checkbox extends React.Component<IProps> {
    public render() {
        const { onChange, ...rest } = this.props;
        const [name, isArray] = parseName(this.props.name);
        const value = this.props.value || "";
        return (
            <FormContext.Consumer>
                { (context) => {
                    const { data } = context;
                    const checked = data[name] === value;
                    return (
                        <div>
                            <input
                                {...rest}
                                type="checkbox"
                                name={ name }
                                value={ data[name] || ""}
                                checked={checked}
                                onChange={(e) => {
                                    const { checked } = e.target;
                                    context.setState({
                                        [name]: checked ? value : null,
                                    });
                                    if (onChange) {
                                        onChange((checked && value) ? value : null);
                                    }
                                }}
                            />
                        </div>
                    );
                } }
            </FormContext.Consumer>
        );
    }
}
