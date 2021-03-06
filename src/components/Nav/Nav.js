import React, { Component } from "react";
import {
  getAllNotes,
  getRandomID,
  noteWatcher,
  putNote
} from "../functions/functions";
import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

export class BottomNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navHidden: "hidden",
      projectName: "",
      projectDescription: "",
      noteName: "",
      noteDescription: "",
      noteProject: "scratch",
      projects: []
    };
    this.showMenu = this.showMenu.bind(this);
    this.saveProject = this.saveProject.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  componentWillMount() {
    this.handleNoteChange();
  }

  componentDidMount() {
    // Subscribe to changes
    noteWatcher().on("change", data => {
      console.log(data);
      console.log("data Changed");
      this.handleNoteChange();
    });
  }

  handleNoteChange() {
    // Update component state whenever the data source changes
    getAllNotes().then(res => {
      console.log(res);
      this.setState({
        notes: res.rows.filter(item => item.doc.type === "note"),
        projects: res.rows.filter(
          item => item.doc.type === "project" && item.doc.editable !== false
        ),
        users: res.rows.filter(item => item.doc.type === "user")
      });
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  saveProject(event) {
    event.preventDefault();
    let project = {
      _id: getRandomID(5),
      type: "project",
      name: this.state.projectName,
      description: this.state.projectDescription,
      created: Date.now()
    };
    console.log(project);
    this.setState({
      projectName: "",
      projectDescription: ""
    });
    putNote(project);
  }

  saveNote(event) {
    event.preventDefault();
    let note = {
      _id: getRandomID(5),
      type: "note",
      name: this.state.noteName,
      description: this.state.noteDescription,
      created: Date.now(),
      project: this.state.noteProject,
      comments: []
    };
    console.log(note);
    this.setState({
      noteName: "",
      noteDescription: ""
    });

    putNote(note);
  }

  showMenu() {
    let navHidden = this.state.navHidden;
    let navState;
    console.log(navHidden);
    if (navHidden === "hidden") {
      navState = "visible";
    } else if (navHidden !== "hidden") {
      navState = "hidden";
    }

    this.setState({
      navHidden: navState
    });
  }

  render() {
    return (
      <div className={"navBarBottom " + this.state.navHidden}>
        <div className={"nav"} onClick={this.showMenu}>
          {/*<div className={"navItem projectsLink " + this.state.navHidden }>Projects</div>*/}
          <div className={"addProjects"}>
            <div className={"plus"}>+</div>
          </div>
          {/*<div className={"navItem notesLink " + this.state.navHidden}>Notes</div>*/}
        </div>
        <div className={"navCreate"}>
          <div className={"create createProject "}>
            <form onSubmit={this.saveProject}>
              <h3 className={"title"}>Create Project</h3>
              <div className={"input"}>
                <input
                  type="text"
                  placeholder={"Project Name"}
                  value={this.state.projectName}
                  name={"projectName"}
                  onChange={this.handleChange}
                />
              </div>
              <div className={"input"}>
                <textarea
                  rows={5}
                  name={"projectDescription"}
                  placeholder={"Project Description"}
                  value={this.state.projectDescription}
                  onChange={this.handleChange}
                />
              </div>
              <div className={"button"}>
                <button>Create Project</button>
              </div>
            </form>
          </div>
          <div className={"create createNote"}>
            <form onSubmit={this.saveNote}>
              <h3 className={"title"}>Create Note</h3>
              <div className={"input"}>
                <input
                  type="text"
                  placeholder={"Note Name"}
                  value={this.state.noteName}
                  name={"noteName"}
                  onChange={this.handleChange}
                />
              </div>
              <div className={"input"}>
                <select
                  name={"noteProject"}
                  value={this.state.noteProject}
                  onChange={this.handleChange}
                >
                  {this.state.projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.doc.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={"input"}>
                <textarea
                  rows={5}
                  placeholder={"Note Description"}
                  value={this.state.noteDescription}
                  name={"noteDescription"}
                  onChange={this.handleChange}
                />
              </div>
              <div className={"button"}>
                <button>Create Note</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export class TopNav extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
    this.goBack = this.goBack.bind(this);
    this.handleNoteChange = this.handleNoteChange.bind(this);
  }

  goBack() {
    window.history.back();
  }

  componentWillMount() {
    this.handleNoteChange();
  }

  componentDidMount() {
    // Subscribe to changes
    noteWatcher().on("change", data => {
      console.log(data);
      this.handleNoteChange();
    });
  }

  handleNoteChange() {
    console.log("Nav Top Note Handle Change");
    // Update component state whenever the data source changes
    getAllNotes().then(res => {
      console.log(res);
      this.setState({
        projects: res.rows.filter(item => item.doc.type === "project")
      });
      console.log(this.state.projects);
    });
  }

  render() {
    return (
      <div className={"navBarTop"}>
        <div className={"logo"}>
          {this.props.backButton && (
            <div onClick={this.goBack} className={"backButton"}>
              {/*<FontAwesomeIcon icon={faChevronCircleLeft} />*/}
            </div>
          )}
          <Link className={"appName"} to={"/"}>
            <h2>Liquid Notepad</h2>
          </Link>
        </div>
        <div className={"projectList"}>
          {/*TODO Reload the page on change*/}
          {this.state.projects.map(project => (
            <Link to={"/project/" + project.id}>{project.doc.name}</Link>
          ))}
        </div>
      </div>
    );
  }
}
