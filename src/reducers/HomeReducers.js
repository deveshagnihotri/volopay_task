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
  IS_EDIT_BTN_CLICK,
  UPDATE_EDIT_CARD_DATA,
  HANDLE_CARD_TYPE_CHECKBOX,
} from '../constants/ActionType';
import data from '../data/data.json';
import {
  UpdateListData,
  updateListAfterRotationById,
  updateListAfterDeleteById,
  addNewCardToList,
  updateEditListById,
  cardTypeList,
} from '../utils/CommonUtils';

const INITIAL_STATE = {
  list: [],
  isLoading: true,
  isModalVisible: false,
  cardTypeList: cardTypeList,
  name: '',
  logoType: '',
  cvv: '',
  expiryDate: '',
  cardNo: '',
  modalFor: 'add',
  editId: null,
};

export default function Home(state = INITIAL_STATE, action) {
  console.log(action, 'Home');
  switch (action.type) {
    case GET_INTIAL_CARD_LIST:
      return {
        ...state,
        isLoading: false,
        list: UpdateListData(data),
      };
    case ROTATE_CARD_BY_ID:
      return {
        ...state,
        list: updateListAfterRotationById(state.list, action.payload),
      };
    case DELETE_CARD_BY_ID:
      return {
        ...state,
        list: updateListAfterDeleteById(state.list, action.payload),
      };
    case IS_MODAL_VISIBLE:
      return {
        ...state,
        isModalVisible: action.payload,
        modalFor: 'add',
        name: '',
        logoType: '',
        cvv: '',
        expiryDate: '',
        cardNo: '',
        editId: null,
      };
    case ON_INPUT_CARD_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case ON_INPUT_CARD_NUMBER:
      return {
        ...state,
        cardNo: action.payload,
      };
    case ON_INOUT_CARD_CVV:
      return {
        ...state,
        cvv: action.payload,
      };
    case ON_INPUT_EXPIRY_DATE:
      return {
        ...state,
        expiryDate: action.payload,
      };
    case ON_INPUT_CARD_TYPE:
      return {
        ...state,
        logoType: action.payload,
      };
    case ADD_NEW_CARD_DATA:
      return {
        ...state,
        list: addNewCardToList(state.list, action.payload),
        isModalVisible: false,
        cardTypeList: cardTypeList,
      };
    case IS_EDIT_BTN_CLICK:
      return {
        ...state,
        isModalVisible: true,
        modalFor: 'edit',
        name: action.payload.dataFor.u_name,
        cvv: action.payload.dataFor.cvv.toString(),
        logoType: action.payload.dataFor.logo.toString(),
        cardNo: action.payload.dataFor.c_number.toString(),
        expiryDate: action.payload.dataFor.expiry_date,
        editId: action.payload.index,
      };
    case UPDATE_EDIT_CARD_DATA:
      return {
        ...state,
        list: updateEditListById(state.list, action.payload),
        isModalVisible: false,
        editId: null,
        modalFor: 'add',
        name: '',
        logoType: '',
        cvv: '',
        expiryDate: '',
        cardNo: '',
        cardTypeList: cardTypeList,
      };
    case HANDLE_CARD_TYPE_CHECKBOX:
      return {
        ...state,
        cardTypeList: action.payload,
      };
    default:
      return state;
  }
}
