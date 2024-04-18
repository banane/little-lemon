import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import Splash from './screens/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import AvatarView from './components/AvatarView';
import Home from './screens/Home';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setOnboardingCompleted] = useState(false);
  const [avatarImage, setAvatarImage] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [fontsLoaded] = useFonts({
		Markazi: require('./assets/fonts/MarkaziText-Regular.ttf'),
		Karla: require('./assets/fonts/Karla-Regular.ttf'),
	});

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    async function loadApp() {
      if(!fontsLoaded) return;
      try {
        const isOnboardedValue = await AsyncStorage.getItem('isOnboarded');
        console.log("isOnboardedValue: " + isOnboardedValue);
        setOnboardingCompleted(isOnboardedValue);
        // setOnboardingCompleted(false);
        setIsLoading(false);
        loadAvatar();
      } catch (e) {
        console.error('error loading app: ', error);
        setIsLoading(false);
      }
    }

    loadApp();
  }, [fontsLoaded]);

  const loadAvatar = async () => {
    const avatarImageValue = await AsyncStorage.getItem("image");
    setAvatarImage(avatarImageValue);
    const firstNameValue = await AsyncStorage.getItem("firstName");
    setFirstName(firstNameValue)
    const lastNameValue = await AsyncStorage.getItem("lastName");
    setLastName(lastNameValue);
  }


  if (isLoading) {
     return <Splash />;
  }

  function LogoTitle() {
    return (
      <Image
        style={{ width: 200, height: 30 }}
        source={require('./assets/Logo.png')}
      />
    );
  }

  function BackButton() {
    return (
      <Ionicons 
                                name="arrow-back-circle-sharp"                          
                                size={20} 
                                color="#495E57" 
                                />
    )
  }
  
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Group 
        screenOptions={{
          headerLeft: (props) => <BackButton {...props} />,
          headerTitle: (props) => <LogoTitle {...props} />,
          headerRight: (props) => <AvatarView image={avatarImage}
            firstName={firstName}
            lastName={lastName}
            small={true} {...props} />,}} >
        { (isOnboardingCompleted) ?  (
              <><Stack.Screen name="Home" component={Home} /><Stack.Screen name="Profile" component={Profile} /></>
          ) : (
              <Stack.Screen name="Onboarding" component={Onboarding} />
        )}
      </Stack.Group>
     </Stack.Navigator>
    </NavigationContainer>
  );
}
