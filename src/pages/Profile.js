import React from 'react';
import { connect } from 'react-redux';
import perfil from '../perfil.png';
import Header from '../components/Header';

class Profile extends React.Component {
  render() {
    const { profile, email, description, history, image } = this.props;
    console.log(image);
    return (
      <>
        <Header />
          {image !== ''
          ? (
            <img id="image-profile" alt="foto" src={ image } />
          ) : (
            <img id="image-profile" alt="foto" src={ perfil } />
          )}
          <button
            onClick={ () => history.push('/profile/edit') }
            type="button"
          >
            Editar perfil
          </button>
        <div className="container-profile">
          <h2 id='testandoo'>Nome</h2>
          <p>{ profile }</p>
          <h2>Email</h2>
          <p>{ email }</p>
          <h2>Descrição</h2>
          <p>{ description }</p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile.name,
  email: state.profile.email,
  description: state.profile.description,
  image: state.profile.image,
})

export default connect(mapStateToProps)(Profile);
