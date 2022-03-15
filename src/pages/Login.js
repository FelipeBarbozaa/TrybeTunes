import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addName } from '../actions';
import login from '../logo.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      buttonDisabled: true,
      name: '',
    };
  }

  handleInput = ({ target: { value } }) => {
    const MIN_LENGTH = 3;
    const disabledChange = value.length >= MIN_LENGTH;
    this.setState({
      name: value,
      buttonDisabled: !disabledChange,
    });
  }

  handleClick = () => {
    const { history, handleName } = this.props;
    history.push('/search');
    const { name } = this.state;
    handleName(name);
  }

  render() {
    const { buttonDisabled } = this.state;
    return (
      <div>
        <img id="logo-login" src={ login } alt="logo" />
        <main className="containerLogin">

          <form id="form-login" action="">

            <input
              onChange={ this.handleInput }
              id="input-login"
              type="text"
              placeholder="Nome"
            />

            <button
              onClick={ this.handleClick }
              id="button-login"
              type="button"
              disabled={ buttonDisabled }
            >
              Entrar
            </button>

          </form>

        </main>
      </div>
    );
  }
}

Login.propTypes = {
  handleName: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const MapDispatchToProps = (dispatch) => ({
  handleName: (value) => dispatch(addName(value)),
});

export default connect(null, MapDispatchToProps)(Login);
