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
  const renderLineSeperator = () => {
    return <View style={styles.lineSeperator} />;
  };

  const handleTypeSelection = (name) => {
    props.handleInputValue('logo', name);
    props.handleCardTypeCheckbox(name);
  };

  const handleSubmitBtn = () => {
    props.handleAddBtn();
  };

  return (
    <Modal
      isVisible={props.isVisible}
      style={styles.centerModal}
      onBackdropPress={() => props.onBackdropPress(false)}
      onDismiss={() => props.onDismiss(false)}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.titleText}>
            {props.modalFor === 'add' ? 'Add a new Card' : 'Edit card'}
          </Text>
          <TouchableOpacity onPress={() => props.onDismiss(false)}>
            <Image
              source={Images.deleteIcon}
              style={{height: 30, width: 30, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        </View>
        {renderLineSeperator()}
        <Text style={styles.labelText}>Name</Text>
        <TextInput
          placeholder="enter a name"
          value={props.name}
          onChangeText={(e) => props.handleInputValue('name', e)}
          style={styles.textField}
          selectionColor={Colors.green}
        />
        <Text style={styles.labelText}>Card no</Text>
        <TextInput
          placeholder="enter a card no of 16 digits"
          value={props.cardNo}
          maxLength={16}
          onChangeText={(e) => props.handleInputValue('cardNo', e)}
          keyboardType="number-pad"
          style={styles.textField}
          selectionColor={Colors.green}
        />
        <Text style={styles.labelText}>Card type</Text>
        <View style={styles.cardType}>
          {props.cardTypeList &&
            props.cardTypeList.map((card) => (
              <TouchableOpacity
                style={styles.cardTypeContainer}
                onPress={() => handleTypeSelection(card.name)}>
                <Image
                  source={
                    card.isSelected ? Images.checkedIcon : Images.uncheckedIcon
                  }
                  style={{height: 25, width: 25}}
                />
                <Text style={styles.cardNameText}>{card.name}</Text>
              </TouchableOpacity>
            ))}
        </View>

        <Text style={styles.labelText}>Expiry date</Text>
        <TextInput
          placeholder="enter a expiry date"
          value={props.expiryDate}
          onChangeText={(e) => props.handleInputValue('date', e)}
          style={styles.textField}
          selectionColor={Colors.green}
        />
        <Text style={styles.labelText}>Cvv</Text>
        <TextInput
          placeholder="enter 3 digit cvv"
          value={props.cvv}
          onChangeText={(e) => props.handleInputValue('cvv', e)}
          keyboardType="number-pad"
          style={styles.textField}
          selectionColor={Colors.green}
          maxLength={3}
        />

        <TouchableOpacity style={styles.btn} onPress={() => handleSubmitBtn()}>
          <Text style={styles.btnText}> Submit</Text>
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
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  header: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  lineSeperator: {
    backgroundColor: '#d4d2d2',
    height: 1,
  },
  textField: {
    height: 40,
    borderColor: Colors.dividercolor1,
    borderRadius: 5,
    borderWidth: 1.2,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 20,
    padding: 5,
  },
  labelText: {
    color: Colors.textColor,
    fontSize: 18,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
  },
  titleText: {
    fontSize: 20,
    color: Colors.textColor,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  cardTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  cardType: {flexDirection: 'row', padding: 5, marginTop: 10},
  cardNameText: {
    color: Colors.textColor,
    marginLeft: 5,
    fontSize: 18,
    color: Colors.textColor,
  },
  btnText: {
    fontSize: 20,
  },
});
