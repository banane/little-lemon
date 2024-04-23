import { 
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet, 
    Text, 
    View } from 'react-native';
import React, { useState, useEffect } from 'react';


import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import AvatarView from '../components/AvatarView';
import CheckBoxPreference from '../components/CheckBoxPreference';
import CustomInput from '../components/CustomInput';
import ProfileButton from '../components/ProfileButton';

const Profile = ({navigation}) => {
    const validator = require('validator');
    const [image, setImage] = useState(null);
    const [imageString, setImageString] = useState(''); // for temporary storage or uri

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
          setImageString(result.assets[0].uri);
        }
    };

    const [preferences, setPreferences] = useState({
        orderStatuses: true,
        newsletter: true,
        passwordChanges: true,
        specialOffers: true,
      });

    const updateState = (key) => () =>
      setPreferences((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
    }));

    const updateStateAndValue = (key, value) => () => 
        setPreferences((prevState) => ({
            ...prevState,
            [key]: value,
        }
    ));

    useEffect(() => {
      setProfileValues();            
    }, []);

    const setProfileValues = async () => {
        const emailValue = await AsyncStorage.getItem('email');
        if(emailValue) {
            setEmail(emailValue);
        }

        const firstNameValue = await AsyncStorage.getItem('firstName');

        if(firstNameValue) {
            setFirstName(firstNameValue);
        }
        const lastNameValue = await AsyncStorage.getItem('lastName');
        if(lastNameValue) {
            setLastName(lastNameValue);
        }
        const phoneValue = await AsyncStorage.getItem('phone');
		if(phoneValue) {
            setPhone(phoneValue);
        }
        const preferencesString = await AsyncStorage.getItem('preferences');
        const preferencesObject = JSON.parse(preferencesString);
        if(preferencesObject) {
            setPreferences(preferencesObject);
        }

        const imageValue = await AsyncStorage.getItem('image');
        if(imageValue) {
            setImage(imageValue);
        }


    };

    const logOut = async () =>  {
        try { 
            setLastName('');
            setFirstName('');
            setEmail('');
            setPhone('');
            await AsyncStorage.clear();
            navigation.navigate('Onboarding');
        } catch (e) {
            console.log("clearing form error: " + e);
        }
    };
    
   
    const clearForm = ({}) =>  {
        setProfileValues();
        alert("Changes discarded.")
    };

    const saveForm = ({}) => {
        if (phone) {
            if (validator.isMobilePhone(phone.toString(), 'en-US')) {
                saveFormToDb();
            } else {
                alert('Phone format is incorrect, please change: ' + phone);
            }
        } else {
            saveFormToDb();
        }
    };

    const saveFormToDb = async () => {
        try {
             await AsyncStorage.setItem("email", email);
             await AsyncStorage.setItem("firstName", firstName);
             await AsyncStorage.setItem("lastName", lastName);
             await AsyncStorage.setItem("phone", phone);
             await AsyncStorage.setItem("preferences", JSON.stringify(preferences));
             await AsyncStorage.setItem("image", imageString);
            alert("🦄 Saved to db.");
            console.log("Changes saved.");
       } catch (e) {
            console.log("Error saving email: " + e);
        }
    };



    return (

        <KeyboardAvoidingView 
                    style={styles.profileContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView  keyboardDismissMode="on-drag">
                <Text style={[styles.sectionTitle, styles.font]}>Personal information</Text>

                <Text style={[styles.avatarText,styles.font]}>Avatar</Text>
                <View style={styles.profileView} >
                    <AvatarView image={image} firstName={firstName} lastName={lastName}/>
                    <View style={[styles.buttonContainer]}>
                        <ProfileButton title={"Change"} onPress={pickImage} priority={true} />
                        <ProfileButton title={"Remove"}  onPress={ () => {
                                setImage('');
                            }} priority={false} />
                    </View>
                   
                </View>
                <View style={styles.formView} >
                    <CustomInput name={'First name'} value={firstName} onChange={setFirstName} />
                    <CustomInput name={'Last name'} value={lastName} onChange={setLastName} />
                    <CustomInput name={'Email'} value={email} onChange={setEmail} keyboardType={'email-address'} />
                    <CustomInput name={'Phone'} value={phone} onChange={setPhone} keyboardType={'phone-pad'} />
                

                    <Text style={[styles.sectionTitle, styles.font, {marginTop: 20,}]}>Email notifications</Text>
                    <CheckBoxPreference preferenceName={"Order Statuses"} 
                        preferenceValue={preferences.orderStatuses}
                        onChange={updateState('orderStatuses')} />
                    <CheckBoxPreference preferenceName={"Special Offers"} 
                        preferenceValue={preferences.specialOffers}
                        onChange={updateState('specialOffers')} />
                    <CheckBoxPreference preferenceName={"Password Changes"} 
                        preferenceValue={preferences.passwordChanges}
                        onChange={updateState('passwordChanges')} />
                    <CheckBoxPreference preferenceName={"Newsletter"} 
                        preferenceValue={preferences.newsletter}
                        onChange={updateState('newsletter')} />
                   
                        
                    <Pressable 
                        style={styles.logoutButton}
                        onPress={logOut}>
                        <Text style={styles.logoutButtonText}> Log out</Text>
                    </Pressable>
                    <View style={styles.buttonContainer}>
                        <ProfileButton title={"Discard Changes"} onPress={clearForm} priority={false} />
                        <ProfileButton title={"Save Changes"} onPress={saveForm} priority={true} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
};


const styles = StyleSheet.create({
    
    buttonContainer:{
        flexDirection: 'row',
        padding: 10,
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
    }, 

    logoutButton: {
        backgroundColor: '#F4CE14',
        width: '100%',
        borderRadius: 6,
        borderColor: '#EE9972',
        borderWidth: 3,
        marginTop: 20,
    },
    logoutButtonText: {
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center',
        padding: 10,
    },
    font: {
        fontFamily: 'Karla',
        fontWeight: 'regular',
    },
    formView: {
        width: '100%',
        flex: 1,
    },
    profileContainer: {
        alignItems: 'left', 
        borderWidth: 1, 
        borderColor: '#efefee', 
        margin: 10, 
        padding: 10,
        backgroundColor: '#fff', 
        borderRadius: 6,
        flex: 1,
        width: '100%',
    },
    sectionTitle: {
        fontSize: 20, 
        fontWeight: 'bold',
    },
    
    avatarText: {
        fontSize: 14, 
        marginVertical: 10,
        color: '#333',
    },
    profileView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default Profile;