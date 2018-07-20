import React, { Component } from "react";
import {getSingleProject, noteWatcher} from "../functions/functions";

class NotePage extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.match.params.id);
        this.state = {
            note: "",
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

    handleChange() {
        // Update component state whenever the data source changes
        getSingleProject(this.props.match.params.id).then(
            (res) => {
                console.log(res)
                this.setState({
                    note: res
                })
                // this.setState({
                //     notes: res.rows.filter(item => item.doc.type === "note" && item.doc.project
                //         === this.props.match.params.id),
                //     project: res.rows.filter(item => item.doc.type === "project" && item.id === this.props.match.params.id),
                //     users: res.rows.filter(item => item.doc.type === "user"),
                // });
            }
        );
    }

  render() {
    return(
        <div className={"notePage"}>
            <h1>{this.state.note.name}</h1>
            <h3>{new Date(this.state.note.created).toLocaleString()}</h3>
            <p>{this.state.note.description}</p>
        </div>
        );
  }
}

export default NotePage;
