import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import header from '../header.png';

class Header extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <>
        <header id="header">
          <div id="container-header">
            <img src={ header } alt="logo" />
            <div id="container-user">
              <p id="header-user-name">{ name }</p>
            </div>
          </div>
        </header>

        <nav id="header-nav">
          <ul>
            <li>
              <Link
                to="/search"
                style={ { textDecoration: 'none', color: '#2FC18C' } }
              >
                Pesquisa
              </Link>
            </li>
            <li>
              <Link
                to="/favorites"
                style={ { textDecoration: 'none', color: '#2FC18C' } }
              >
                Favoritas
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                style={ { textDecoration: 'none', color: '#2FC18C' } }
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }
}

Header.propTypes = {
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  name: state.profile.name,
});

export default connect(mapStateToProps)(Header);
