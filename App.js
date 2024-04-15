import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import Splash from './screens/Splash';
import Header from './components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'react-native';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setOnboardingCompleted] = useState(false)
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('isOnboarded');
        setIsLoading(false);
        setOnboardingCompleted(value);
      } catch (e) {
        Alert.alert(`An error occurred: ${e.message}`);
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
  
  

  return (
    <NavigationContainer>
      <Stack.Navigator>
      { (isOnboardingCompleted != null || isOnboardingCompleted != false) ? (
        <Stack.Screen 
          name="Profile" 
          component={Profile}  
          options={{ 
            headerTitle: (props) => <LogoTitle {...props} />, 
            headerRight: (props) => <Avatar {...props} />,
          }}
        />
      ) : (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
     </Stack.Navigator>
    
    </NavigationContainer>
  );
}