import React from "react";
import { Form, Label, Input, Button } from "reactstrap";

class SearchFilter extends React.Component {
  state = {
    value: ""
  };

  submit = (e) => {
    e.preventDefault();
    this.props.onConfirm(this.state.value);
  };

  render() {
    return (
      <Form onSubmit={this.submit} inline>
        <Label>
          Filter by:
          <Input
            bsSize="sm"
            value={this.state.value}
            onChange={(e) => this.setState({ value: e.target.value })}
          />
        </Label>
        <Button size="sm" color="primary" onClick={this.submit}>
          Filter
        </Button>
      </Form>
    );
  }
}

export default SearchFilter;
