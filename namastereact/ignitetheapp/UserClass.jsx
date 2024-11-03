import React from "react";

class User extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // this is a reserved variable state
      count: 0,
      updatedName: "jagdish",
    };
  }

  handleClick = () => {
    console.log("clicked");
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    const { name } = this.props;
    const { count, updatedName } = this.state;
    return (
      <div>
        <h1>Hello world</h1>
        <h1>{name}</h1>
        <h1>{count}</h1>
        <h1>{updatedName}</h1>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}

export default User;
