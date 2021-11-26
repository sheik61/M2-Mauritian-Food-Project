/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import {Colors} from './Variables';
import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 13,
  },
  secondaryButton: {
    backgroundColor: Colors.icons,
    borderRadius: 13,
  },
  redButton: {
    borderRadius: 13,
    borderColor: 'red',
    borderWidth: 1,
    backgroundColor: 'white',
    color: 'red'
  },
  backgroundPrimary: {
    backgroundColor: Colors.backgroundColor,
  },
  backgroundReset: {
    backgroundColor: Colors.transparent,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.text,
    backgroundColor: Colors.white,
    color: Colors.text,
    minHeight: 50,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  birdyStroke: {
    borderColor: Colors.backgroundColor,
    borderRadius: 30,
    height: 30,
    borderWidth: 1
  },
  eagleStroke: {
    backgroundColor: Colors.backgroundColor,
    borderRadius: 30,
    height: 30,
  },
  bogeyStroke: {
    borderColor: 'red',
    borderWidth: 1
  },
  doubleBogeyStroke: {
    backgroundColor: 'red'
  }
});
