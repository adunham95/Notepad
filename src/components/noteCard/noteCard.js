import React, { Component } from "react";
import {deleteSingleNote, getRandomID, putNote} from "../functions/functions";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {Comment} from "../comment/comment";

class NoteCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentNote: "",
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.newComment = this.newComment.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    deleteItem(){
      console.log("Deleting " + this.props.note.id);
      deleteSingleNote(this.props.note.id);
    }

    newComment(event){
        event.preventDefault();
        let comment ={
            id: getRandomID(5),
            note: this.state.commentNote,
            time: Date.now()
        };
        let commentArray = this.props.note.doc.comments;
        commentArray.push(comment);

        let note = {
            _id: this.props.note.id,
            _rev: this.props.note.doc._rev,
            type: this.props.note.doc.type,
            name: this.props.note.doc.name,
            description: this.props.note.doc.description,
            created: this.props.note.doc.created,
            project: this.props.note.doc.project,
            comments: commentArray
        };
        console.log(note);
        this.setState({
            commentNote: ""
        });
        putNote(note, true);
    }

    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

  render() {
    return(
      <div className={"noteCard"}>
          <div className={"content"}>
            <div className={"topContent"}>
                <Link to={"/note/" + this.props.note.id} key={this.props.note.id}>
                    <h2>{this.props.note.doc.name}</h2>
                </Link>
                <h4>{new Date(this.props.note.doc.created).toLocaleString()}</h4>
                <p>{this.props.note.doc.description}</p>
            </div>
            <div className={"actions"}>
                {this.props.note.doc.editable !== false &&
                    <div onClick={this.deleteItem}><FontAwesomeIcon icon={faTrash}/></div>
                }
            </div>
              <div className={"commentBlocks"}>
                  {this.props.note.doc.comments.map((comment) => (
                      <Comment data={comment}/>
                  ))}
                  {this.props.note.doc.editable !== false &&
                  <div className={"newComment"}>
                      <form onSubmit={this.newComment}>
                          <div className={"input"}>
                              <input type="text"
                                     placeholder={"Comment"}
                                     value={this.state.commentNote}
                                     name={"commentNote"}
                                     onChange={this.handleChange}

                              />
                          </div>
                          <div className={"button"}>
                              <button>Add Comment</button>
                          </div>
                      </form>
                  </div>
                  }
              </div>
          </div>

    </div>);
  }
}

export default NoteCard;
