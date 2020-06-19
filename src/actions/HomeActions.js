import {
  GET_INTIAL_CARD_LIST,
  ROTATE_CARD_BY_ID,
  DELETE_CARD_BY_ID,
  IS_MODAL_VISIBLE,
  ON_INPUT_CARD_NAME,
  ON_INPUT_CARD_NUMBER,
  ON_INOUT_CARD_CVV,
  ON_INPUT_EXPIRY_DATE,
  ON_INPUT_CARD_TYPE,
  ADD_NEW_CARD_DATA,
} from '../constants/ActionType';

export const homeAction = (name) => {
  return (dispatch) => {
    dispatch({type: GET_INTIAL_CARD_LIST, payload: 'devesh'});
  };
};

export const handleCardFlip = (id) => {
  return (dispatch) => {
    dispatch({type: ROTATE_CARD_BY_ID, payload: id});
  };
};

export const handleDeleteCard = (id) => {
  return (dispatch) => {
    dispatch({type: DELETE_CARD_BY_ID, payload: id});
  };
};

export const handleModalVisible = (val) => {
  return (dispatch) => {
    dispatch({type: IS_MODAL_VISIBLE, payload: val});
  };
};

export const handleFormInput = (from, val) => {
  console.log(from, val, 'handleFormInput');
  switch (from) {
    case 'name':
      return (dispatch) => {
        dispatch({type: ON_INPUT_CARD_NAME, payload: val});
      };
    case 'cvv':
      return (dispatch) => {
        dispatch({type: ON_INOUT_CARD_CVV, payload: val});
      };
    case 'cardNo':
      return (dispatch) => {
        dispatch({type: ON_INPUT_CARD_NUMBER, payload: val});
      };
    case 'logo':
      return (dispatch) => {
        dispatch({type: ON_INPUT_CARD_TYPE, payload: val});
      };
    case 'date':
      return (dispatch) => {
        dispatch({type: ON_INPUT_EXPIRY_DATE, payload: val});
      };
  }
};

export const addNewCard = (name, logoType, cvv, expiryDate, cardNo) => {
  let data = {name, logoType, cvv, expiryDate, cardNo};
  return (dispatch) => {
    dispatch({type: ADD_NEW_CARD_DATA, payload: data});
  };
};
