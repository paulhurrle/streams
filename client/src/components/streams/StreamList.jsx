import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllStreams } from '../../actions';

class StreamList extends Component {
  componentDidMount() {
    this.props.getAllStreams();
  }

  renderButtons(stream) {
    if (stream.userId === this.props.currentUser) {
      return (
        <div className="right floated content">
          <Link
            to={`/streams/edit/${stream.id}`}
            className="ui button primary"
          >
            Edit
        </Link>
          <Link
            to={`/streams/delete/${stream.id}`}
            className="ui button negative"
          >
            Delete
        </Link>
        </div>
      );
    } else {
      return null;
    }
  }

  renderStreams() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderButtons(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">
              {stream.title}
            </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreateStream() {
    if (this.props.isSignedIn) {
      return (
        <Link to="/streams/new" className="ui right floated positive button">
          Create Stream
        </Link>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderCreateStream()}
        <h2>Streams</h2>
        <div className="ui celled list">
          {this.renderStreams()}
        </div>
        {this.renderCreateStream()}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  currentUser: state.auth.currentUser,
  isSignedIn: state.auth.isSignedIn,
  streams: Object.values(state.streams),
});

export default connect(mapStateToProps, { getAllStreams })(StreamList);