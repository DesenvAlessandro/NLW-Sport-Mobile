import { useRef, useEffect } from 'react';
import { StatusBar } from 'react-native';

import {  useFonts, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from '@expo-google-fonts/inter';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications';

import { Routes } from './src/routes';
import { Background } from './src/components/Background';
import { Loading } from './src/components/Loading';

import './src/services/notificationsConfigs';
import { getPushNotificationToken } from './src/services/getPushNotificationToken';


export default function App() {
  const [fontsLoad] = useFonts({
    Inter_400Regular, 
    Inter_600SemiBold, 
    Inter_700Bold, 
    Inter_900Black
  });

  const getPushNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();
  
  useEffect(() => {
    getPushNotificationToken();
  });

  useEffect(() => {
    getPushNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification);
    });

    responseNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      if(getPushNotificationListener.current && responseNotificationListener.current){
        Notifications.removeNotificationSubscription(getPushNotificationListener.current);
        Notifications.removeNotificationSubscription(responseNotificationListener.current);

      }
    }
  })

  return (
    <Background>
      <StatusBar
        barStyle= "light-content"
        backgroundColor="transparent"
        translucent
      />
      
      {fontsLoad ? <Routes /> : <Loading />}
    </Background>
  );
}
