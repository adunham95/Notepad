import React, { Component } from "react";
import {getRandomID, saveToLocalStorage} from "../functions/functions";

class Nav extends Component {
    constructor(props){
        super(props);
        this.state = {
            navHidden: "hidden",
            projectName: "",
            projectDescription: "",
            noteName: "",
            noteDescription: "",
        };
        this.showMenu = this.showMenu.bind(this);
        this.saveProject = this.saveProject.bind(this);
        this.savenote = this.savenote.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        console.log(target);


        this.setState({
            [name]: value
        });
    }

    saveProject(event){
        event.preventDefault();
        let project = {
            _id: getRandomID(5),
            type: "project",
            name: this.state.projectName,
            description: this.state.projectDescription,
            created: Date.now(),
        };
        console.log(project);
        this.setState({
            projectName: "",
            projectDescription: "",
        });

        saveToLocalStorage(project);
    }

    savenote(event){
        event.preventDefault();
        let note = {
            _id: getRandomID(5),
            type: "note",
            name: this.state.noteName,
            description: this.state.noteDescription,
            created: Date.now(),
        };
        console.log(note);
        this.setState({
            noteName: "",
            noteDescription: "",
        });

        saveToLocalStorage(note);
    }

    showMenu(){
        let navHidden =this.state.navHidden;
        let navState;
        console.log(navHidden);
        if(navHidden === "hidden"){
            navState = "visible";
        }
        else if(navHidden !== "hidden"){
            navState = "hidden"
        }

        this.setState( {
            navHidden: navState
        } );
    }

  render() {
    return(
      <div className={"navBar " + this.state.navHidden}>
        <div className={"nav"}>
            <div className={"navItem projectsLink"}>Projects</div>
            <div className={"addProjects"} onClick={this.showMenu}>
                <div className={"plus"}>+</div>
            </div>
            <div className={"navItem notesLink"}>Notes</div>
        </div>
        <div className={"navCreate"}>
            <div className={"create createProject"}>
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
                        <button>
                            Create Project
                        </button>
                    </div>
                </form>
            </div>
            <div className={"create createNote"}>
                <form onSubmit={this.savenote}>
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
                    <textarea
                        rows={5}
                        placeholder={"Note Description"}
                        value={this.state.noteDescription}
                        name={"noteDescription"}
                        onChange={this.handleChange}
                    />
                </div>
                <div className={"button"}>
                    <button>
                        Create Note
                    </button>
                </div>
                </form>
            </div>
        </div>
      </div>
    );
  }
}

export default Nav;
