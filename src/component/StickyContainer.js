import React from "react";
import "./StyickyContainer.style.css";

class Draggable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      relativePosition: {
        x: 0,
        y: 0,
      },
    };
    this.stickyRef = React.createRef();
  }

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onMouseUp);
    }
  }

  onMouseDown = (e) => {
    if (e.button !== 0) return;
    const pos = this.stickyRef.current.getBoundingClientRect();
    this.setState({
      dragging: true,
      relativePosition: {
        x: e.pageX - pos.left,
        y: e.pageY - pos.top,
      },
    });
  };

  onMouseUp = (e) => {
    this.setState({
      dragging: false,
    });
  };

  onMouseMove = (e) => {
    const { dragging, relativePosition } = this.state;
    const { updateNote, noteDetail, index } = this.props;
    if (dragging) {
      updateNote(index, noteDetail.noteText, false,  {
        x: e.pageX - relativePosition.x,
        y: e.pageY - relativePosition.y,
      });
    }
    e.stopPropagation();
    e.preventDefault();
  };

  updateNote = (e, heading) => {
    const { updateNote, index } = this.props;
    updateNote(index, e.target.innerHTML, heading)
  };

  render() {
    const { noteDetail, createNote, deleteNote, index, notes } = this.props;
    return (
      <div
        className="card text-center"
        ref={this.stickyRef}
        style={{
          position: "absolute",
          left: `${noteDetail.position.x}px`,
          top: `${noteDetail.position.y}px`,
        }}
      >
        <div className="card-header" onMouseDown={this.onMouseDown}>
          <i
            className="fas fa-plus float-left pt-1 pointer"
            onClick={createNote}
          ></i>
          <span
            className="pl-10 textareatitle"
            contentEditable
            onBlur={(e) => this.updateNote(e, true)}
            dangerouslySetInnerHTML={{__html: noteDetail.name}}
          >
          </span>
          {notes.length > 1 && (
            <i
              className="fas fa-trash float-right pt-1 pointer"
              onClick={() => deleteNote(index)}
            ></i>
          )}
        </div>
        <div
          className="textareadiv"
          contentEditable
          onBlur={(e) => this.updateNote(e, false)}
          dangerouslySetInnerHTML={{__html: noteDetail.noteText}}
        >
        </div>
        <div className="card-footer text-muted footer" onMouseDown={this.onMouseDown}>
          {noteDetail.updateDate}
        </div>
      </div>
    );
  }
}

export default Draggable;
