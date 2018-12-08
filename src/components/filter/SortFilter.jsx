import React from "react";
import { Form, Label, Input } from "reactstrap";

class SortFilter extends React.Component {
  state = {
    value: ""
  };

  submit = () => {
    this.props.onConfirm(this.state.value);
  };

  render() {
    return (
      <Form className="Filter Filter__sort-filter" inline>
        <Label>
          Sort by:
          <Input
            bsSize="sm"
            type="select"
            value={this.state.value}
            onChange={(e) =>
              this.setState({ value: e.target.value }, this.submit)
            }
          >
            {this.props.options.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </Input>
        </Label>
      </Form>
    );
  }
}

export default SortFilter;
