import React, { Component } from "react";
import {deleteSingleNote, getRandomID, saveToLocalStorage} from "../functions/functions";

class NoteCard extends Component {

    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.state = {
          newName: props.note.doc.name,
          newDescription: props.note.doc.description,
          id: props.note.doc._id,
          created: props.note.doc.created,
          type: props.note.doc.type,

        };
        this.handleChange = this.handleChange.bind(this);
        this.savenote = this.savenote.bind(this);
    }

    deleteItem(){
      console.log("Deleting " + this.props.note.id);
      deleteSingleNote(this.props.note.id);
    }

    editItem(){
      console.log("editing Items");

    }

    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    savenote(event){
        event.preventDefault();
        let note = {
            _id: this.state.id,
            type: this.state.type,
            name: this.state.newName,
            description: this.state.newDescription,
            created: this.state.created,
        };
        console.log(note);
        saveToLocalStorage(note, true);
    }

  render() {
    return(
      <div className={"noteCard"}>
          <div className={"topContent"}>
            <div className={"content"}>
                <h2>{this.props.note.doc.name}</h2>
                <h4>{new Date(this.props.note.doc.created).toLocaleString()}</h4>
                <p>{this.props.note.doc.description}</p>
            </div>
            <div className={"actions"}>
              <div onClick={this.deleteItem}>Delete</div>
              <div onClick={this.editItem}>Edit</div>
            </div>
          </div>
          <div className={"editContent"}>
              <form onSubmit={this.savenote}>
                  <div className={"input"}>
                      <input
                          type="text"
                          placeholder={"Note Name"}
                          value={this.state.newName}
                          name={"newName"}
                          onChange={this.handleChange}
                      />
                  </div>
                  <div className={"input"}>
                    <textarea
                        rows={5}
                        placeholder={"Note Description"}
                        value={this.state.newDescription}
                        name={"newDescription"}
                        onChange={this.handleChange}
                    />
                  </div>
                  <div className={"button"}>
                      <button>
                          Update Note
                      </button>
                  </div>
              </form>
          </div>

    </div>);
  }
}

export default NoteCard;
