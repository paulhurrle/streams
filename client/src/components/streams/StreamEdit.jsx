import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editStream, getStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
  }

  onFormSubmit = (formData) => {
    this.props.editStream(this.props.match.params.id, formData);
  }

  render() {
    const { stream } = this.props;

    if (!stream) {
      return null;
    }

    // by passing initialValues prop to reduxForm wrapped component,
    // reduxForm will assign initial values to any Fields whose `name` matches
    // a given key in the initialValues prop object
    return (
      <div>
        <h3>Edit Stream</h3>
        <StreamForm
          onSubmit={this.onFormSubmit}
          initialValues={{ title: stream.title, description: stream.description }}
        />
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  stream: state.streams[ownProps.match.params.id],
});

export default connect(mapStateToProps, { editStream, getStream })(StreamEdit);