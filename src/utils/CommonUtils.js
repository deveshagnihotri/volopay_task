import {ErrorToast, SuccessToast} from '../constants/Static';

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
    return {status: false, msg: 'please, enter a name'};
  } else if (cardNo === '' || cardNo.toString().length < 16) {
    return {status: false, msg: 'please, enter a valid card no of 16 digit'};
  } else if (cvv === '' || cvv.toString().length < 3) {
    return {status: false, msg: 'please,enter a valid cvv of 3 digit'};
  } else if (logoType === '') {
    return {status: false, msg: 'please, select a card type'};
  } else if (expiryDate === '') {
    return {status: false, msg: 'please, enter a expiry date'};
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

export const updateCardNoText = (a) => {
  a = a
    .toString()
    .split('')
    .reverse()
    .join('')
    .replace(/([0-9]{4})/g, '$1 ')
    .split('')
    .reverse()
    .join('');
  return a;
};

export const updateEditListById = (prevList, data) => {
  let result = prevList;
  result.map((card, index) => {
    if (index === data.id) {
      card.c_number = data.cardNo;
      card.cvv = data.cvv;
      card.expiryDate = data.expiryDate;
      card.logo = data.logoType;
      card.c_name = data.name;
      card.isRotated = false;
      card.id = data.id;
    }
  });
  SuccessToast('card updated successfuly');
  return [...prevList];
};
