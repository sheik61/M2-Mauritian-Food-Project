import { StyleSheet } from 'react-native';


export default StyleSheet.create({
  modalView: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'space-between',
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalWarningIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain'
  }
});
