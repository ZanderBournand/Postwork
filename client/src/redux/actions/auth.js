import { LOGIN, UPDATE_USER }  from '../constants/index'
import * as api from '../../api'

export const signin = (formData, navigate) => async (dispatch) => {
    try {
      const { data } = await api.signIn(formData);
  
      dispatch({ type: LOGIN, data });

    } catch (error) {
      console.log(error);
    }
};
  
export const signup = (formData, navigate) => async (dispatch) => {
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