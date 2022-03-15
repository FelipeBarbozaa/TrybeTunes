import React from 'react';
import Header from '../components/Header';
import { editProfile } from '../actions';
import { connect } from 'react-redux';
import perfil from '../perfil.png'

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      image: '',
      name: '',
      email: '',
      description: '',
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  handleClick = () => {
    const { handleEdit, history } = this.props
    handleEdit(this.state);
    history.push('/profile')
  }
  render() {
    return (
      <>
        <Header />
        <div>
          <img id="image-profile" alt="profile" src={ perfil }></img>
          <input
            onChange={ this.handleChange }
            name="image" 
            type="text" 
            placeholder="Insira um link:" 
          />
          <h2>Nome</h2>
          <p>Fique à vontade para usar um nome social</p>
          <input
            onChange={ this.handleChange }
            name="name" 
            type="texet" 
            placeholder='Nome' 
          />
          <h2>Email</h2>
          <p>Escolha um e-mail que consulte diariamente</p>
          <input
            onChange={ this.handleChange }
            name="email" 
            type="texet" 
            placeholder='usuario@usuario.com.br' 
          />
          <h2>Descrição</h2>
          <p>Sobre mim</p>
          <textarea
            onChange={ this.handleChange }
            name="description" 
            cols={23} rows={5}
          />
          <br></br>
          <button type="button" onClick={ this.handleClick }>Salvar</button>
        </div>
      </>
    );
  }
}

const MapDispatchToProps = (dispatch) => ({
  handleEdit: (value) => dispatch(editProfile(value)),
});

export default connect(null, MapDispatchToProps)(ProfileEdit);
