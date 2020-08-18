import React, { Component } from "react";
import "./App.css";

var list = [
  {
    name: 'Eren Yeager',
    age: 44,
    Position: 'Regional Manager'
  },
  {
    name: 'Melissa Ackerman',
    age: 24,
    Position: 'Tech Specialist'
  },
  {
    name: 'Armin Artlert',
    age: 54,
    Position: 'Operations Specialist'
  },
  {
    name: 'Sherry Goyal',
    age: 24,
    Position: 'Tech Specialist'
  },
  {
    name: 'Zeke Yeager',
    age: 34,
    Position: 'Security'
  },
  {
    name: 'Burt Hoover',
    age: 18,
    Position: 'Novice Tech Specialist'
  },
  {
    name: 'Faith Evans',
    age: 20,
    Position: 'Novice Tech Specialist'
  },
  {
    name: 'Jermaine Woo',
    age: 28,
    Position: 'Head Tech Specialist'
  }
];

class Users extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    //console.log("rendering user");
    const list = [];
    const currIndex = (this.props.currPage - 1) * this.props.itemsPerPage;
    for (var i = currIndex; i < currIndex + this.props.itemsPerPage && i < this.props.users.length; i++) {
      list.push([
        <div key={i}>
          <b>Name: </b> {this.props.users[i].name} <br />
          <b>Age: </b>{this.props.users[i].age} <br />
          <b>Position: </b>{this.props.users[i].Position} <br /> <br />
        </div>
      ]);
    }
    //console.log(list);
    return (
      <div className="users">
        {list}
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: list,
      currPage: 1,
      numOfPages: 1,
      userPerPage: list.length
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.decPage = this.decPage.bind(this);
    this.incPage = this.incPage.bind(this);
  }

  handleChange(event) {
    if (event.target.value > 0) {
      this.setState({
        userPerPage: parseInt(event.target.value),
        numOfPages: Math.ceil(this.state.users.length / parseInt(event.target.value))
      });
    }
  }

  handleClick(event) {
    this.setState({
      currPage: parseInt(event.target.innerHTML)
    });
  }

  decPage() {
    if (this.state.currPage > 1) {
      this.setState((prevState, props) => ({
        currPage: prevState.currPage - 1
      }));
    }
  }

  incPage() {
    if (this.state.currPage < this.state.numOfPages) {
      this.setState((prevState, props) => ({
        currPage: prevState.currPage + 1
      }));
    }
  }

  render() {
    console.log("CurrPage: " + this.state.currPage);
    const items = [];
    for (var i = 1; i <= this.state.numOfPages; i++) {
      if (this.state.currPage === i) {
        items.push(
          <li className="page-item active">
            <a className="page-link"
              href="#"
              onClick={this.handleClick}>{i}</a>
          </li>
        );
      } else {
        items.push(
          <li className="page-item">
            <a className="page-link"
              href="#"
              onClick={this.handleClick}>{i}</a>
          </li>
        );
      }
    }
    return (
      <div>
        <h1> User Directory </h1>
        Enter Employee per page: <input type="number"
          value={this.state.userPerPage}
          onChange={this.handleChange} />
        <br /><br />
        <Users
          users={this.state.users}
          currPage={this.state.currPage}
          itemsPerPage={this.state.userPerPage} />

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a class="page-link" href="#"
                onClick={this.decPage}>Previous</a>
            </li>
            {items}
            <li className="page-item">
              <a class="page-link" href="#"
                onClick={this.incPage}>Next</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default App;