import React from "react";
import FormContext from "./FormContext";

interface IProps {
}

export default class Radio extends React.Component<IProps> {
    public render() {
        const { name, onChange, ...rest } = this.props;
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
                                type="radio"
                                name={name}
                                value={value}
                                checked={checked}
                                onChange={(e) => {
                                    const { checked } = e.target;
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
