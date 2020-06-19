import SnackBar from 'react-native-snackbar';
import Colors from './Colors';

export const ErrorToast = (text) => {
  console.log(text, 'ErrorToast');
  requestAnimationFrame(() => {
    SnackBar.show({
      title: text,
      // color: ,
      duration: SnackBar.LENGTH_LONG,
      backgroundColor: Colors.errorLogin,
    });
  });
};

export const SuccessToast = (text) => {
  requestAnimationFrame(() => {
    SnackBar.show({
      title: text,
      duration: SnackBar.LENGTH_LONG,
      backgroundColor: Colors.green,
    });
  });
};

export const NotificationToast = (text) => {
  requestAnimationFrame(() => {
    SnackBar.show({
      title: text,
      duration: SnackBar.LENGTH_LONG,
      backgroundColor: Colors.rbThemeColor,
      color: Colors.black,
    });
  });
};
