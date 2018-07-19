import React, { Component } from "react";
import Nav from "../Nav/Nav";
import {getAllNotes, noteWatcher} from "../functions/functions";
import NoteCard from "../noteCard/noteCard";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount(){
        getAllNotes().then(
            (res) => {
                console.log(res);
                this.setState({
                    notes: res.rows,
                })
            }
        );
    }

    componentDidMount() {
        // Subscribe to changes
        noteWatcher().on("change", (data)=> {
            console.log(data);
            console.log("data Changed");
            this.handleChange()
        });
        //
        //
        //
        // noteWatcher().on("change").then(this.handleChange());
        // this.handleChange()


    }

    handleChange() {
        // Update component state whenever the data source changes
        getAllNotes().then(
            (res) => {
                console.log(res);
                this.setState({
                    notes: res.rows,
                })
            }
        );
    }


  render() {
      return (<div>
          <div className={"notesContainer"}>
              {this.state.notes.map((note) => (
                  <NoteCard key={note.id} note={note}/>
                  // <div key={note.id}>{note.doc.name} - {note.doc.type}</div>
              ))}
          </div>
        <Nav/>
      </div>);
  }
}

export default Home;
