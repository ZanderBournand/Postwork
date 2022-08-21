import { LOGIN, UPDATE_USER }  from '../constants/index'
import * as api from '../../api'

export const signin = (formData) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
  
      dispatch({ type: LOGIN, data });

    } catch (error) {
      console.log(error);
    }
};

export const signinGoogle = (formData) => async (dispatch) => { 
  try {
    const { data } = await api.signInGoogle(formData)
    
    dispatch({ type: LOGIN, data });
  } catch (error) {
    console.log(error);
  }
}
  
export const signup = (formData) => async (dispatch) => {
    try {
      const { data } = await api.signUp(formData);

      dispatch({ type: LOGIN, data });

    } catch (error) {
      console.log(error);
    }
};

export const updateUser = (id, userChanges) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(id, userChanges);
    dispatch({ type: UPDATE_USER, data})
  } catch (error) {
    console.log(error);
  }
}

export const updateUserAbout = (id, userChanges) => async (dispatch) => {
  try {
    const { data } = await api.updateUserAbout(id, userChanges);
    dispatch({ type: UPDATE_USER, data})
  } catch (error) {
    console.log(error);
  }
}