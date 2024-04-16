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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setOnboardingCompleted] = useState(false)

  const [fontsLoaded] = useFonts({
		Markazi: require('./assets/fonts/MarkaziText-Regular.ttf'),
		Karla: require('./assets/fonts/Karla-Regular.ttf'),
	});

  const Stack = createNativeStackNavigator();

  useEffect(() => {
    (async () => {
      if (!fontsLoaded) return;
      try {
        console.log("in initial app start");
        const value = await AsyncStorage.getItem('isOnboarded');
        setIsLoading(false);
        console.log("value: " + value.toString());
        console.log("isOnboardingCompleted: " + isOnboardingCompleted.toString());

        setOnboardingCompleted(value);
      } catch (e) {
        Alert.alert(`An error occurred loading app: ${e.message}`);
      }
    })();
  }, []);


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

  function Avatar() {
    return (
      <Image
        style={{ width: 30, height: 30 }}
        source={require('./assets/profile-tiny.png')}
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
    <NavigationContainer >
      <Stack.Navigator>
      { (isOnboardingCompleted) ? (
       <Stack.Screen 
        name="Profile" 
        component={Profile}  
        options={{ 
          headerLeft: (props) => <BackButton {...props} />,
          headerTitle: (props) => <LogoTitle {...props} />, 
          headerRight: (props) => <Avatar {...props} />,
        }}
        style={{backgroundColor: "#fff"}}
      />         
      ) : (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
     </Stack.Navigator>
    </NavigationContainer>
  );
}
