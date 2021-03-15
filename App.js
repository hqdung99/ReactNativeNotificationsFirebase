import React, {useEffect, useState} from 'react';
import {Text, View, Image} from 'react-native';
import messaging from '@react-native-firebase/messaging';

function App() {
  const [notification, setNotification] = useState({
    title: undefined,
    body: undefined,
    image: undefined,
  });

  const getToken = async () => {
    const token = await messaging().getToken();
    console.log('.........................: ', token);
  };

  useEffect(() => {
    getToken();
    messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('onNotificationOpenedApp: ', JSON.stringify(remoteMessage));
      setNotification({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        image: remoteMessage.notification.android.imageUrl,
      });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
          setNotification({
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body,
            image: remoteMessage.notification.android.imageUrl,
          });
        }
      });
  }, []);

  return (
    <View>
      <Text>Firebase Messaging</Text>
      <Text>{`title: ${notification?.title}`}</Text>
      <Text>{`title: ${notification?.body}`}</Text>
      <Image source={{uri: notification?.image}} width={500} height={500} />
    </View>
  );
}

export default App;
