import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import { Config } from '../Config'

const ApiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 3000,
})

ApiClient.interceptors.request.use(async function (config) {
  config.headers.Authorization = await getAccessToken();
  return config;
});

ApiClient.interceptors.response.use(function (response) {
  return response?.data;
}, function (error) {
  return error?.response?.data;
});


const getAccessToken = async () => {
  try {
    const retrievedItem = await AsyncStorage.getItem('authKey');
    if (retrievedItem !== null) {
      const authorization = `Bearer ${retrievedItem}`;
      return authorization;
    } return null;
  } catch (error) {
    // Error retrieving data
  }
};


export default ApiClient;
