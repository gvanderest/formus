import React from "react";

export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formState: props.formState || {},
            errors: props.errors || {},
        };
    }
    public componentWillReceiveProps(nextProps, nextState) {
        const { formState, errors } = nextProps;
        const formState = nextProps.formState || nextState.formState || {};
        const errors = nextProps.errors || nextState.errors || {};
        this.setState({
            ...this.state,
            formState,
            errors,
        });
        console.log("form props", nextProps);
    }
    public render() {
        const { onChange } = this.props;
        const { formState, errors } = this.state;
        const context = {
            errors,
            formState,
            setState: (data) => {
                const updatedFormState = {
                    ...formState,
                    ...data,
                };

                this.setState({
                    ...this.state,
                    formState: updatedFormState,
                });
                if (onChange) {
                    onChange(updatedFormState);
                }
            },
        };

        return (
            <FormContext.Provider value={context}>
                <form>
                    <p>FORM CONTEXT: {JSON.stringify(context)}</p>
                    {this.props.children(context)}
                </form>
            </FormContext.Provider>
        );
    }
}
