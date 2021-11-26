import { Platform, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { currentLocale } from './Utils';

class CommonFunction {
  static requestAndroidGeolocationPermissions = () =>
    new Promise((resolve) => {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then((granted) => {
        if (granted) {
          resolve(true);
        } else {
          let locale = currentLocale();
          let title =
            locale === 'fr' ? 'Accès à la localisation' : 'Access to location';
          let message =
            locale === 'fr'
              ? 'mruFood nécessite un accès à la localisation de votre téléphone'
              : 'mruFood require access to the location of your phone';

          PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION],
            {
              title: title,
              message: message,
            },
          ).then((response) =>
            resolve(
              response['android.permission.ACCESS_FINE_LOCATION'] === 'granted',
            ),
          );
        }
      });
    });

  static requestIOSGeolocationPermissions = () =>
    new Promise((resolve) =>
      Geolocation.requestAuthorization('whenInUse').then((status) =>
        resolve(status === 'granted'),
      ),
    );

  static geolocalise = async (
    onSuccess = () => { },
    onError = () => { },
    options = { timeout: 20000, maximumAge: 1000, enableHighAccuracy: true },
  ) => {
    let permissionGranted = false;

    if (Platform.OS === 'android') {
      permissionGranted = await this.requestAndroidGeolocationPermissions();
    } else {
      permissionGranted = await this.requestIOSGeolocationPermissions();
    }
    Geolocation.getCurrentPosition(onSuccess, onError, options);
  };
}
export default CommonFunction;
