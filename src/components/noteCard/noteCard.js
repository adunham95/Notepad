import React, { Component } from "react";
import {deleteSingleNote, getRandomID, putNote} from "../functions/functions";
import {Link} from "react-router-dom";

class NoteCard extends Component {

    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(){
      console.log("Deleting " + this.props.note.id);
      deleteSingleNote(this.props.note.id);
    }

  render() {
    return(
      <div className={"noteCard"}>
          <div className={"topContent"}>
            <div className={"content"}>
                <Link to={"/note/" + this.props.note.id} key={this.props.note.id}>
                    <h2>{this.props.note.doc.name}</h2>
                </Link>
                <h4>{new Date(this.props.note.doc.created).toLocaleString()}</h4>
                <p>{this.props.note.doc.description}</p>
                <div className={"commentBlocks"}>
                    {this.props.note.doc.comments.map((comment) => (
                        <div key={comment}>{comment} </div>
                    ))}
                </div>

            </div>
            <div className={"actions"}>
                {this.props.note.doc.editable !== false &&
                    <div onClick={this.deleteItem}>Delete</div>
                }
            </div>
          </div>

    </div>);
  }
}

export default NoteCard;
