import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {
  homeAction,
  handleCardFlip,
  handleDeleteCard,
  handleModalVisible,
  handleFormInput,
  addNewCard,
  handleEditModal,
  handleCardTypeCheckbox,
  handleEditCard,
} from '../../actions/HomeActions';
import Colors from '../../constants/Colors';
import ImgData from '../../constants/Images';
import ModalComponent from '../Modal';
import {checkFormValidation, updateCardNoText} from '../../utils/CommonUtils';
import {ErrorToast} from '../../constants/Static';

class HomeScreen extends Component {
  componentDidMount() {
    this.props.homeAction();
  }

  renderLineSeperator = () => {
    return <View style={styles.lineSeperator} />;
  };

  handleFlipCard = (id) => {
    this.props.handleCardFlip(id);
  };

  handleDeleteCard = (id) => {
    this.props.handleDeleteCard(id);
  };

  handleModalVisible = (val) => {
    this.props.handleModalVisible(val);
  };

  onChangeTextInput = (from, e) => {
    this.props.handleFormInput(from, e);
  };

  renderHeader = (card, index) => {
    return (
      <View style={styles.iconBox}>
        <TouchableOpacity onPress={() => this.handleFlipCard(card.id)}>
          <Image source={ImgData.rotateIcon} style={styles.img} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.handleEditModal(true, card, index)}>
          <Image source={ImgData.editIcon} style={styles.img} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.handleDeleteCard(card.id)}>
          <Image source={ImgData.deleteIcon} style={styles.img} />
        </TouchableOpacity>
      </View>
    );
  };

  renderFrontView = (card) => {
    return (
      <>
        <View style={styles.header}>
          <Text>Credit card</Text>
          <Text>State bank of India</Text>
        </View>
        {this.renderLineSeperator()}
        <View style={styles.cardNum}>
          <Text style={styles.numText}>{updateCardNoText(card.c_number)}</Text>
        </View>
        {this.renderLineSeperator()}
        <View style={styles.footer}>
          <Text>{card.u_name}</Text>
          <Image
            source={
              card.logo === 'MasterCard'
                ? ImgData.mastercardIcon
                : ImgData.visaIcon
            }
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
      </>
    );
  };

  renderBackView = (card) => {
    return (
      <>
        <Text style={styles.noText}>24*7 call center: 1800 1234 2324 3535</Text>
        {this.renderLineSeperator()}
        <View style={styles.headerBack} />
        {this.renderLineSeperator()}
        <View style={styles.cardBackName}>
          <Text style={styles.sign}>{card.u_name}</Text>
          <Text style={styles.numText}>{card.cvv}</Text>
        </View>
        {this.renderLineSeperator()}
        <View style={styles.expiryDate}>
          <Text>expiry date(MM/YYYY) {card.expiry_date}</Text>
        </View>
        {this.renderLineSeperator()}
        <View style={styles.footer}>
          <Text>Not valid for payment in foreign</Text>
          <Text>Verified by {card.logo}</Text>
        </View>
      </>
    );
  };

  handleAddNewCard = () => {
    let {name, logoType, cvv, expiryDate, cardNo} = this.props;
    let result = checkFormValidation(name, logoType, cardNo, expiryDate, cvv);
    if (result.status && this.props.modalFor === 'add') {
      this.props.addNewCard(name, logoType, cvv, expiryDate, cardNo);
    } else if (result.status && this.props.modalFor !== 'add') {
      let data = {
        name,
        logoType,
        cvv,
        expiryDate,
        cardNo,
        id: this.props.editId,
      };
      this.props.handleEditCard(data);
    } else {
      ErrorToast(result.msg);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.props.list &&
            this.props.list.map((card, index) => (
              <View style={styles.card}>
                {this.renderHeader(card, index)}
                {this.renderLineSeperator()}
                {!card.isRotated
                  ? this.renderFrontView(card, index)
                  : this.renderBackView(card, index)}
              </View>
            ))}
        </ScrollView>
        <TouchableOpacity
          style={styles.addContainer}
          onPress={() => this.handleModalVisible(true)}>
          <Image source={ImgData.addIcon} style={styles.addIcon} />
        </TouchableOpacity>
        <ModalComponent
          isVisible={this.props.isModalVisible}
          onBackdropPress={() => this.handleModalVisible(false)}
          onDismiss={() => this.handleModalVisible(false)}
          name={this.props.name}
          cvv={this.props.cvv}
          date={this.props.expiryDate}
          logo={this.props.logo}
          cardNo={this.props.cardNo}
          logoType={this.props.logoType}
          handleInputValue={(from, e) => this.onChangeTextInput(from, e)}
          handleAddBtn={() => this.handleAddNewCard()}
          modalFor={this.props.modalFor}
          cardTypeList={this.props.cardTypeList}
          handleCardTypeCheckbox={(name) =>
            this.props.handleCardTypeCheckbox(this.props.cardTypeList, name)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f7f5f5',
    backgroundColor: Colors.bgColor,
  },
  card: {
    margin: 8,
    backgroundColor: Colors.white,
    marginTop: 10,
    shadowOffset: {width: 3, height: 5},
    shadowColor: Colors.dividerColor,
    elevation: 3,
    shadowRadius: 5,
    shadowOpacity: 0.4,
    borderRadius: 5,
  },
  iconBox: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    padding: 5,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  lineSeperator: {
    backgroundColor: '#d4d2d2',
    height: 1,
  },
  cardNum: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 22,
  },
  numText: {
    fontSize: 22,
    fontWeight: '800',
  },
  icon: {height: 50, width: 80},
  footer: {
    flexDirection: 'row',
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  img: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  addContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  addIcon: {
    height: 80,
    width: 80,
  },
  headerBack: {
    padding: 22,
    backgroundColor: Colors.grey,
  },
  cardBackName: {
    flexDirection: 'row',
    margin: 5,
    padding: 10,
  },
  sign: {
    flex: 1,
    padding: 5,
    backgroundColor: Colors.lightGray,
  },
  noText: {
    fontSize: 14,
    padding: 5,
    color: Colors.textColor,
  },
  expiryDate: {
    padding: 5,
    fontSize: 18,
  },
});

const mapStateToprops = ({Home}) => {
  const {
    list,
    isLoading,
    isModalVisible,
    name,
    logoType,
    cvv,
    expiryDate,
    cardNo,
    modalFor,
    editId,
    cardTypeList,
  } = Home;
  return {
    list,
    isLoading,
    isModalVisible,
    logoType,
    name,
    cvv,
    expiryDate,
    cardNo,
    modalFor,
    editId,
    cardTypeList,
  };
};

export default connect(mapStateToprops, {
  homeAction,
  handleCardFlip,
  handleDeleteCard,
  handleModalVisible,
  handleFormInput,
  addNewCard,
  handleEditModal,
  handleEditCard,
  handleCardTypeCheckbox,
})(HomeScreen);
