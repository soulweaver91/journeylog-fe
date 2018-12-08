import React from "react";
import {
  Form,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  Button
} from "reactstrap";

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
      <Form
        className="Filter Filter__sort-filter"
        onSubmit={this.submit}
        inline
      >
        <Label>
          Filter by:
          <InputGroup>
            <Input
              bsSize="sm"
              value={this.state.value}
              onChange={(e) => this.setState({ value: e.target.value })}
            />
            <InputGroupAddon addonType="append">
              <Button size="sm" color="primary" onClick={this.submit}>
                Filter
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </Label>
      </Form>
    );
  }
}

export default SearchFilter;
