import React from "react";
import FormContext from "./FormContext";

export class Checkbox extends React.Component<ICheckboxProps> {
    public render() {
        const { name, value, onChange, ...rest } = this.props;
        const value = this.props.value || true;
        return (
            <FormContext.Consumer>
                {(context) => {
                    const { formState } = context;
                    const checked = formState[name] === value;
                    return (
                        <div>
                            <input
                                {...rest}
                                type="checkbox"
                                name={name}
                                value={formState[name] || ""}
                                checked={checked}
                                onChange={(e) => {
                                    const { checked } = e.target;
                                    context.setState({
                                        [name]: checked ? value : null,
                                    });
                                    if (onChange) {
                                        onChange(checked ? value : null);
                                    }
                                }}
                            />
                        </div>
                    );
                }}
            </FormContext.Consumer>
        );
    }
}
