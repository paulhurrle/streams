import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteStream, getStream } from '../../actions';
import Modal from '../Modal';
import history from '../../history';

class StreamDelete extends Component {
  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
  }

  renderActions() {
    const { id } = this.props.match.params;
    return (
      <Fragment>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteStream(id)}
        >
          Delete
        </button>
        <Link to="/" className="ui button">Cancel</Link>
      </Fragment>
    );
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure you want to delete this stream?';
    }
    return `Are you sure you want to delete the stream "${this.props.stream.title}"?`;
  }

  render() {
    return (
      <Modal
        actions={this.renderActions()}
        content={this.renderContent()}
        header="Delete Stream"
        onDismiss={() => history.push('/')}
      />
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id],
});

export default connect(mapStateToProps, { deleteStream, getStream })(StreamDelete);