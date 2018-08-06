import React, { Component } from "react";

export class Comment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={"comment"}>{this.props.data.note}</div>;
  }
}
