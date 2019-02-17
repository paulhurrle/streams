import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStream } from '../../actions';

class StreamShow extends Component {
  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
  }

  render() {
    const { stream } = this.props;
    if (!stream) {
      return null;
    }
    return (
      <div>
        <h1>{stream.title}</h1>
        <h5>{stream.description}</h5>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id],
});

export default connect(mapStateToProps, { getStream })(StreamShow);