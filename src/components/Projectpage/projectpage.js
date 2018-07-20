import React, { Component } from "react";
import {getAllNotes, getSingleProject, noteWatcher} from "../functions/functions";
import NoteCard from "../noteCard/noteCard";
import {TopNav} from "../Nav/Nav";

export class ProjectPage extends Component {
   constructor(props) {
        super(props);
        console.log(this.props.match.params.id);
        this.state = {
            notes: [],
            project: [],
            users: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        this.handleChange();
    }

    componentDidMount() {
        // Subscribe to changes
        noteWatcher().on("change", (data)=> {
            console.log(data);
            console.log("data Changed");
            this.handleChange()
        });
    }

    componentWillUnmount(){
        noteWatcher().cancel();
    }

    handleChange() {
        // Update component state whenever the data source changes
        getAllNotes().then(
            (res) => {
                this.setState({
                    notes: res.rows.filter(item => item.doc.type === "note" && item.doc.project
                        === this.props.match.params.id),
                    project: res.rows.filter(item => item.doc.type === "project" && item.id === this.props.match.params.id),
                    users: res.rows.filter(item => item.doc.type === "user"),
                });
                console.log(this.state)
            }
        );
    }

  render() {
      return(
          <div>
              <TopNav>

              </TopNav>
              <div className={"page"}>
                {this.state.project.map((project) => (
                    <h1 className={"title"} key={project.id}>{project.doc.name}</h1>
                ))}

                {this.state.notes.map((note) => (
                    <NoteCard key={note.id} note={note}/>
                ))}
              </div>
          </div>
      );
  }
}

