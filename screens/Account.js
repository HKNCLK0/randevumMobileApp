import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {COLORS} from '../Colors';
import {setData} from '../redux/slices/UserSlices';

import {
  StyledAccountButton,
  StyledBox,
  StyledContainer,
  StyledTitle,
} from '../components/main/StyledComponents';

import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

import PushNotification from 'react-native-push-notification';

import {buttonData} from '../components/Data';

//TODO:Account Page Yapılacak
//TODO:Stack Yapısı Düzenlenecek
const Account = ({navigation}) => {
  const sendNotification = () => {
    PushNotification.localNotification({
      channelId: 'deneme-channel',
      title: 'Deneme',
      message: 'Deneme Message',
    });
  };
  const colorSchema = useColorScheme();

  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await AsyncStorage.removeItem('userToken');
    dispatch(setData(''));
    navigation.navigate('Anasayfa');
  };

  /*useEffect(() => {
    messaging()
      .getToken(firebase.app().options.messagingSenderId)
      .then(x => console.log(x))
      .catch(e => console.log(e));
  }, []);*/

  return (
    <StyledContainer theme={colorSchema}>
      <StyledBox theme={colorSchema}>
        <StyledTitle theme={colorSchema}>Hesap</StyledTitle>
        {buttonData.map((buton, index) => (
          <StyledAccountButton
            onPress={() => navigation.navigate(buton.navigateName)}
            key={index}
            activeOpacity={0.7}
            theme={colorSchema}
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 2, height: 4},
              shadowOpacity: 0.8,
              shadowRadius: 2,
              elevation: 8,
            }}>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 12,
                color:
                  colorSchema == 'light'
                    ? COLORS.LIGHT.TEXT_COLOR
                    : COLORS.DARK.TEXT_COLOR,
              }}>
              {buton.name}
            </Text>
          </StyledAccountButton>
        ))}

        <StyledAccountButton
          onPress={() => handleLogOut()}
          activeOpacity={0.7}
          theme={colorSchema}
          style={{
            marginTop: 48,
            backgroundColor: COLORS.DARK.RED,
            shadowColor: '#f0ffff',
            shadowOffset: {width: 2, height: 4},
            shadowOpacity: 0.8,
            shadowRadius: 2,
            elevation: 8,
          }}>
          <Text
            style={{
              fontFamily: 'Montserrat-SemiBold',
              fontSize: 12,
              color:
                colorSchema == 'light'
                  ? COLORS.LIGHT.TEXT_COLOR
                  : COLORS.DARK.TEXT_COLOR,
            }}>
            Çıkış Yap
          </Text>
        </StyledAccountButton>
      </StyledBox>
    </StyledContainer>
  );
};

export default Account;
