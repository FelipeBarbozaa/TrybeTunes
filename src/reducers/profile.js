import { ADD_NAME } from '../actions';
import { EDIT_PROFILE } from '../actions';

const INITIAL_STATE = {
  name: 'none',
  email: 'none',
  description: 'none',
  image: ''
};

const profile = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_NAME:
    return { ...state, name: action.payload };
  case EDIT_PROFILE:
    return { ...state,
      name: action.payload.name,
      email: action.payload.email,
      description: action.payload.description,
      image: action.payload.image,
    }
  default:
    return state;
  }
};

export default profile;
