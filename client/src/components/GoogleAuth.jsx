import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {
  componentDidMount() {
    // the gapi library is made available via a script found in index.html
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        clientId: '91267088630-6fvtd46pd7dfolrtdrh06cn52stle86j.apps.googleusercontent.com',
        scope: 'email',
      }).then((() => {
        // make the auth object available to any method of this class
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get());
        this.auth.isSignedIn.listen(this.onAuthChange);
      }));
    });
  }

  onAuthChange = (isSignedIn) => isSignedIn
    ? this.props.signIn(this.auth.currentUser.get().getId())
    : this.props.signOut();

  handleSignInOut = () => this.props.isSignedIn
    ? this.auth.signOut()
    : this.auth.signIn();

  renderAuthButton() {
    if (this.props.isSignedIn === null) {
      return null;
    } else if (this.props.isSignedIn) {
      return (
        <button
          className="ui red google button"
          onClick={this.handleSignInOut}
        >
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button
          className="ui green google button"
          onClick={this.handleSignInOut}
        >
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return (
      <div>
        {this.renderAuthButton()}
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);