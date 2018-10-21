import React from "react";
import FormContext from "./FormContext";

interface IProps {
    name: string;
}

export default class Input extends React.Component<IProps> {
    public render() {
        const { name, onChange, ...rest } = this.props;
        return (
            <FormContext.Consumer>
                {(context) => {
                    const { formState } = context;
                    return (
                        <div>
                            <input
                                {...rest}
                                name={name}
                                value={formState[name] || ""}
                                onChange={(e) => {
                                    const { value } = e.target;
                                    context.setState({
                                        [name]: value,
                                    });
                                    if (onChange) {
                                        onChange(value);
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
