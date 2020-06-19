import {ErrorToast, SuccessToast} from '../constants/Static';
import Images from '../constants/Images';

export const UpdateListData = (prevList) => {
  let newList = prevList.map((list) => ({
    ...list,
    isRotated: false,
  }));
  return newList;
};

export const updateListAfterRotationById = (prevList, id) => {
  prevList.filter((list) => {
    if (list.id === id) {
      list.isRotated = list.isRotated ? false : true;
    }
  });
  return [...prevList];
};

export const updateListAfterDeleteById = (prevList, id) => {
  let newList = prevList.filter((list) => list.id !== id);
  SuccessToast('Card deleted successfully');
  return newList;
};

export const addNewCardToList = (prevList, newData) => {
  console.log(prevList, newData, 'addNewCardToList');
  let newObj = {
    id: prevList.length + 1,
    u_name: newData.name,
    c_number: newData.cardNo,
    isRotated: false,
    logo: newData.logoType,
    expiry_date: newData.expiryDate,
    cvv: newData.cvv,
  };
  console.log(newObj, 'newObj');
  prevList.push(newObj);
  SuccessToast('Card added successfully');
  return prevList;
};

export const checkFormValidation = (
  name,
  logoType,
  cardNo,
  expiryDate,
  cvv,
) => {
  if (name === '') {
    return {status: false, msg: 'enter a name'};
  } else if (cardNo === '' || cardNo.toString().length < 16) {
    return {status: false, msg: 'enter a valid card no of 16 digit'};
  } else if (cvv === '' || cvv.toString().length < 3) {
    return {status: false, msg: 'enter a valid cvv of 3 digit'};
  } else if (expiryDate === '') {
    return {status: false, msg: 'enter a expiry date'};
  } else {
    return {status: true};
  }
};

export const cardTypeList = [
  {name: 'MasterCard', isSelected: false},
  {name: 'Visa', isSelected: false},
];

export const handleCardTypeSelection = (prevList, selectedName) => {
  prevList.map((card) => {
    if (card.name === selectedName) {
      card.isSelected = true;
    } else {
      card.isSelected = false;
    }
  });
  return [...prevList];
};
