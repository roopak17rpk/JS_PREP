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

//**
/**
 * React Class Component Lifecycle Methods Order
 * 
 * Parent Component Lifecycle:
 * 1. constructor(props)
 * 2. render()
 * 3. componentDidMount()
 * 4. componentDidUpdate(prevProps, prevState)
 * 5. componentWillUnmount()
 * 
 * When Parent has 2 Child Components (Child1, Child2):
 * 
 * Mounting Phase:
 * - Parent constructor
 * - Parent render
 *    - Child1 constructor 
 *    - Child1 render
 *    - Child2 constructor
 *    - Child2 render
 * - Child1 componentDidMount
 * - Child2 componentDidMount
 * - Parent componentDidMount
 * 
 * Updating Phase:
 * - Parent render
 *    - Child1 render
 *    - Child2 render
 * - Child1 componentDidUpdate
 * - Child2 componentDidUpdate
 * - Parent componentDidUpdate
 * 
 * Unmounting Phase:
 * - Child1 componentWillUnmount
 * - Child2 componentWillUnmount
 * - Parent componentWillUnmount
 */
