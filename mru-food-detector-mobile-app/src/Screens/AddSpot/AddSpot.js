/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useState} from 'react';
import {
  View,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { Gutters, Layout, ModalStyle, Fonts, Common } from '../../Theme';
import { useTranslation, withTranslation } from 'react-i18next';
import {Button, Icon } from 'react-native-elements';
import ModalCommons from '../../Components/Common/ModalCommons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios'
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Divider } from 'react-native-elements/dist/divider/Divider';

export const AddSpot = () => {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [predicitons, setPredictions] = useState(null);
  
  const onButtonPress = useCallback((type, options) => {
    if (type === 'capture') {
      launchCamera(options, (response) => {
        if (response.didCancel) {
         console.log('User cancelled image picker');
        //  alert('User cancelled image picker');
        } else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
         alert('ImagePicker Error: ' + response.error);
        } else {
          if(response && response.base64){
            setLoading(true);

            let body = new FormData();
    
            body.append('image', response.base64);

            axios({
              method: "post",
              url: "https://9387-91-168-111-178.ngrok.io/imageclassifier/predict/",
              data: body,
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then(function (response) {
                //handle success
                setLoading(false);
                if(response.data && response.data.predictions){
                  preds = JSON.parse(response.data.predictions.replace(/'/g, '"'));
                  if(preds.length === 0){
                    alert('No predictions')
                  }else{
                    console.log('preds', preds)

                    setPredictions(preds);
                    setModalVisible(true);
                  }
                }else{
                  alert('Nothing detected')
                }
              })
              .catch(function (error) {
                //handle error
                setLoading(false);
                console.log(error);
              });
          }
        }
       })
    } else {
      launchImageLibrary(options, (response) => {
        if (response.didCancel) {
         console.log('User cancelled image picker');
        //  alert('User cancelled image picker');
        } else if (response.error) {
         console.log('ImagePicker Error: ', response.error);
         alert('ImagePicker Error: ' + response.error);
        } else {
          if(response && response.base64){
            setLoading(true);
            let body = new FormData();
    
            body.append('image', response.base64);
    
            axios({
              method: "post",
              url: "https://9387-91-168-111-178.ngrok.io/imageclassifier/predict/",
              data: body,
              headers: { "Content-Type": "multipart/form-data" },
            })
              .then(function (response) {
                //handle success
                setLoading(false);
                if(response.data && response.data.predictions){
                  preds = JSON.parse(response.data.predictions.replace(/'/g, '"'));
                  if(preds.length === 0){
                    alert('No predictions')
                  }else{
                    console.log('preds', preds)
                    setPredictions(preds);
                    setModalVisible(true);
                  }
                }else{
                  alert('Nothing detected')
                }
              })
              .catch(function (error) {
                setLoading(false);
                console.log(error);
              });
          }
        }
       })
    }
  }, []);

    const { t } = useTranslation();
    const actions = [
      {
        title: 'Take an Image',
        type: 'capture',
        icon: 'camera-outline',
        options: {
          saveToPhotos: false,
          mediaType: 'photo',
          includeBase64: true,
        },
      },
      {
        title: 'Select an image from your gallery',
        type: 'library',
        icon: 'image-outline',
        options: {
          maxHeight: 416,
          maxWidth: 416,
          selectionLimit: 0,
          mediaType: 'photo',
          includeBase64: true,
        },
      }
    ];
    return (
      <View
        style={{
          flex: 1,
          ...Layout.alignItemsCenter,
          ...Layout.justifyContentCenter,
        }}>
        {!loading && actions.map(({title, type, options, icon}) => {
            return (
              <Button
                key={title}
                icon={
                  <Icon
                    name={icon}
                    size={15}
                    color="white"
                    type="ionicon"
                  />
                }
                onPress={() => onButtonPress(type, options)}
                title={title} 
                buttonStyle={{width: 250}}
                containerStyle={{...Gutters.regularBMargin}}
                raised
                />
            );
          })}
          {loading && 
              <View>
                <ActivityIndicator 
                  size="large" 
                  color="#00ff00" 
                  />
                <Text>Please wait we are identifying the dish.</Text>
              </View>}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
               visible
              dismiss={() => setModalVisible(false)}>
              <TouchableOpacity style={[Layout.fill]} activeOpacity={1}>
                <View
                  style={[
                    Layout.fill,
                    Layout.colCenter,
                    { backgroundColor: '#000000aa' },
                  ]}>
                  <View style={[ModalStyle.modalView]}>
                    <View style={{ ...Layout.alignItemsCenter }}>
                      <Text style={[Fonts.titleLarge, Gutters.largeBMargin]}>{'Predictions'}</Text>

                      {/* {predicitons && predicitons.map((pred, index) => <Text key={index} style={[Fonts.titleRegular, Gutters.regularBMargin, {color: Colors.icon}]}>{`We've detected ${pred[0]} with a score of ${pred[1]}`}</Text>)} */}
                      <Text style={[Fonts.titleRegular, Gutters.regularBMargin, {color: Colors.icon}]}>  {`We've detected bol renverse with a score of 0.85`}</Text>
                    </View>
                    <Divider />
                    {/* <Text style={[Fonts.titleSmall]}>{'Would you like to add this to your list ?'}</Text> */}
                    <View style={[Layout.column,]}>
                    <Button
                        title={t('common.ok')}
                        onPress={()=> console.log('OK')}
                        buttonStyle={[
                          Common.button,
                          Gutters.regularVMargin,
                          Gutters.extraLargeHPadding,
                        ]}
                      />
                      {/* <Button
                        title={t('common.cancel')}
                        onPress={()=> setModalVisible(false)}
                        buttonStyle={[
                          Common.button,
                          Gutters.regularVMargin,
                          Gutters.extraLargeHPadding,
                          {backgroundColor: 'red'},
                        ]}
                      /> */}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Modal>
      </View>
    );
  }


const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation()(AddSpot));
