import React, { Component } from "react";
import { getAllNotes, noteCancel, noteWatcher } from "../functions/functions";
import NoteCard from "../noteCard/noteCard";
import { Link } from "react-router-dom";
import { TopNav } from "../Nav/Nav";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      projects: [],
      users: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    this.handleChange();
  }

  componentDidMount() {
    // Subscribe to changes
    noteWatcher().on("change", data => {
      console.log(data);
      console.log("data Changed");
      this.handleChange();
    });
  }

  componentWillUnmount() {
    noteWatcher().cancel();
  }

  handleChange() {
    // Update component state whenever the data source changes
    getAllNotes().then(res => {
      console.log(res);
      this.setState({
        notes: res.rows.filter(item => item.doc.type === "note"),
        projects: res.rows.filter(item => item.doc.type === "project"),
        users: res.rows.filter(item => item.doc.type === "user")
      });
    });
  }

  render() {
    return (
      <div>
        <TopNav />
        <div className={"notesContainer page"}>
          <h3>Notes</h3>
          {this.state.notes.map(note => <NoteCard key={note.id} note={note} />)}

          <h3>Projects</h3>
          {this.state.projects.map(project => (
            <Link to={"/project/" + project.id} key={project.id}>
              <div>{project.doc.name}</div>
            </Link>
          ))}
          <h3>Users</h3>
          {this.state.users.map(user => (
            <div key={user.id}>{user.doc.name}</div>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;
