import { 
    Alert, 
    KeyboardAvoidingView,
    Platform,
    Pressable,
    StyleSheet,
    Text, 
    TextInput, 
    View, 
 } from 'react-native';
 import { useState } from 'react';
 import { useFonts } from 'expo-font';
 import Header from '../components/Header';
 import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        'Klarna': require('../assets/fonts/Karla-Regular.ttf'),
      });
    const [name, onChangeName] = useState('');
    const [email, onChangeEmail] = useState('');
    const validator = require('validator');
    const validForm = (name.length > 0) && (validator.isEmail(email));

    const storeData = async () =>  {
        try { 
            AsyncStorage.setItem("isOnboarded", "true"); 
          } catch (e) { 
            Alert.alert("An error occurred"); 
          } 
    };

    return (
        <View style={{flex: 1, backgroundColor: '#efefee', width: '100%'}}>
            <Header />
            
            <View style={{flex: 0.8, backgroundColor: '#D3D4D3', flexDirection: 'column'}}>                 
                <Text style={[styles.onboardingTitle, styles.bodyText]}>Let us get to know you</Text>
                
                <KeyboardAvoidingView 
                    style={styles.onboardingForm}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <Text 
                        style={styles.bodyText}
                        >First Name</Text>
                    <TextInput 
                        style={styles.input}
                        value={name}
                        onChangeText={onChangeName} />
                        
                    <Text style={styles.bodyText}>Email</Text>
                    <TextInput style={styles.input}  
                                            value={email}
                                            onChangeText={onChangeEmail}
                                            keyboardType={'email-address'}                    
                    />
                </KeyboardAvoidingView>
            </View>
            <View style={styles.buttonContainer} >
                <Pressable 
                    style={[(validForm ? styles.activeButton : styles.inactiveButton),styles.button] } 
                    onPress={ () => {
                     if (validForm) {
                        storeData();
                        console.log("storing data: name: " + name + ", email: " + email);
                        navigation.push('Profile');
                     } else {
                        alert('💩 form is not OK');
                     }
                    }}>
                    <Text style={validForm ? styles.buttonTextActive : styles.buttonTextInactive}>Next</Text>
                </Pressable>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    onboardingForm: {
        flex: 1, 
        justifyContent: 'flex-end', 
        marginBottom: 30
    },
    buttonContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
   },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        borderRadius: 8,
        alignSelf: 'center',
    },      
    bodyText: {
        color:"#333",
        fontSize: 24,
        alignSelf: 'center',
        // fontFamily: 'Klarna',
    },
    onboardingTitle: {
        paddingTop: 50,
    },
    activeButton: {
        backgroundColor: '#D3D4D3', 
    },
    button: {
        flex: 0.2, 
        flexDirection: 'row',        
        alignSelf: 'center',
        width: 80,
        borderRadius: 8, 
        paddingRight: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
    },
    inactiveButton: {
        backgroundColor: '#d2d7d5',
    },
    buttonTextActive: {
        textAlign: 'center',
        marginLeft: 'auto',
        color:"#333",
        fontSize: 24,
        alignSelf: 'center',
    },
    buttonTextInactive: {
        textAlign: 'center',
        marginLeft: 'auto',
        color:"#fff",
        fontSize: 24,
        alignSelf: 'center',
    },
    
  });

export default Onboarding;