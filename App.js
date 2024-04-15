import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import Profile from './screens/Profile';
import Splash from './screens/Splash';
import AsyncStorage from '@react-native-async-storage/async-storage';


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

  return (
    <NavigationContainer>
      <Stack.Navigator>
      { (isOnboardingCompleted != null || isOnboardingCompleted != false) ? (
        <Stack.Screen name="Profile" component={Profile} />
      ) : (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      )}
     </Stack.Navigator>
    </NavigationContainer>
  );
}
