import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import {cardTypeList, handleCardTypeSelection} from '../utils/CommonUtils';
import Images from '../constants/Images';

export default function ModalComponent(props) {
  const [cardType, setCardType] = useState(cardTypeList);

  const renderLineSeperator = () => {
    return <View style={styles.lineSeperator} />;
  };

  const handleTypeSelection = (name) => {
    let result = handleCardTypeSelection(cardType, name);
    props.handleInputValue('logo', name);
    setCardType([...result]);
  };

  return (
    <Modal
      isVisible={props.isVisible}
      style={styles.centerModal}
      onBackdropPress={() => props.onBackdropPress(false)}
      onDismiss={() => props.onDismiss(false)}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.titleText}>Add a new Card</Text>
        </View>
        {renderLineSeperator()}
        <Text style={styles.labelText}>Name</Text>
        <TextInput
          placeholder="name"
          value={props.name}
          onChangeText={(e) => props.handleInputValue('name', e)}
          style={styles.textField}
          selectionColor={Colors.green}
        />
        <Text style={styles.labelText}>Card no</Text>
        <TextInput
          placeholder="Card no"
          value={props.cardNo}
          maxLength={16}
          onChangeText={(e) => props.handleInputValue('cardNo', e)}
          keyboardType="number-pad"
          style={styles.textField}
          selectionColor={Colors.green}
        />
        <Text style={styles.labelText}>Card type</Text>
        <View style={styles.cardType}>
          {cardType.map((card) => (
            <TouchableOpacity
              style={styles.cardTypeContainer}
              onPress={() => handleTypeSelection(card.name)}>
              <Image
                source={
                  card.isSelected ? Images.checkedIcon : Images.uncheckedIcon
                }
                style={{height: 20, width: 20}}
              />
              <Text style={styles.cardNameText}>{card.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.labelText}>expiry date</Text>
        <TextInput
          placeholder="expiry date"
          value={props.expiryDate}
          onChangeText={(e) => props.handleInputValue('date', e)}
          style={styles.textField}
          selectionColor={Colors.green}
        />
        <Text style={styles.labelText}>CVV</Text>
        <TextInput
          placeholder="Cvv"
          value={props.cvv}
          onChangeText={(e) => props.handleInputValue('cvv', e)}
          keyboardType="number-pad"
          style={styles.textField}
          selectionColor={Colors.green}
          maxLength={3}
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={() => props.handleAddBtn()}>
          <Text>Add card</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centerModal: {
    zIndex: 1,
  },
  content: {
    backgroundColor: Colors.white,
    borderRadius: 5,
  },
  btn: {
    backgroundColor: Colors.minanceBlue,
    margin: 10,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lineSeperator: {
    backgroundColor: '#d4d2d2',
    height: 1,
  },
  textField: {
    height: 40,
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 1.5,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  labelText: {
    color: Colors.textColor1,
    fontSize: 16,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
  },
  titleText: {fontSize: 20, color: Colors.textColor},
  cardTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  cardType: {flexDirection: 'row', padding: 5},
  cardNameText: {color: Colors.textColor, marginLeft: 5},
});
