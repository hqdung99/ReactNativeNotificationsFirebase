1. Create Project

- npx react-native init FirebaseMessaging

2. Get docs and install

- Gettting Started
- Cloud Messing

3. Get code

- Handler Background
- Handle Foreground
- Handle Quit

4. Test

- Test with all app
- Test with FCM registration token (Firebase Cloud Messaging)

  const getToken = async () => {
  const token = await messaging().getToken();
  console.log('.........................: ', token);
  };
