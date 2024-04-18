import { 
    Image, 
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet, 
    Text, 
    TextInput, 
    View } from 'react-native';
import React, { useState, useEffect } from 'react';

import { MaskedTextInput } from "react-native-mask-text";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import AvatarView from '../components/AvatarView';
import CheckBoxPreference from '../components/CheckBoxPreference';

const Profile = ({navigation}) => {
    const validator = require('validator');
    const [image, setImage] = useState(null);

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
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
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

    useEffect(() => {
      loadProfileData();            
    }, []);

    const loadProfileData = async () => {
        try {
            const jsonString = await AsyncStorage.getItem('user');
			if (!jsonString) return;
			await setProfileValues(JSON.parse(jsonString));
        } catch (e) {
            console.log("error: " + e);
        }
    }

    const setProfileValues = async userAsyncStorage => {
        const { firstName, email, lastName, phone } = userAsyncStorage;
		setFirstName(firstName);
		setLastName(lastName || '');
		setEmail(email);
		setPhone(phone || '');
    };

    const logOut = async () =>  {
        try { 
            setLastName('');
            setFirstName('');
            setEmail('');
            setPhone('');
            await AsyncStorage.clear();
            alert("🦄 Logged out.");
        } catch (e) {
            console.log("clearing form error: " + e);
        }
    };
    
   
    const clearForm = ({}) =>  {
        loadProfileData();
        alert("Changes discarded.")
    };
    const saveForm = ({}) => {
        if (validator.isMobilePhone(phone.toString(), 'en-US')) {
            console.log("valid format: " + phone);
            saveFormToDb();
        } else {
            console.log("💩 invalid format: " + phone);
            alert('💩 phone is not  OK: ' + phone);
        }
    };

    const saveFormToDb = async () => {
        try {
             await AsyncStorage.setItem("email", email);
             await AsyncStorage.setItem("firstName", firstName);
             await AsyncStorage.setItem("lastName", lastName);
             await AsyncStorage.setItem("phone", phone);
            alert("🦄 Saved to db.");
            console.log("🦄 Saved to db.");


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
                    
                    <Pressable style={styles.changeButton}
                        onPress={pickImage}
                    >
                        <Text style={styles.changeButtonText}>Change</Text>
                    </Pressable>
                    <Pressable style={styles.removeButton}
                        onPress={ () => {
                            setImage('');
                        }}>
                        <Text style={[styles.removeButtonText,styles.font]}>Remove</Text></Pressable>
                </View>
                <View style={styles.formView} >
                    <Text style={[styles.formLabel, styles.font]}>First name</Text>
                    <View style={styles.inputBox}>
                        <TextInput styles={styles.input} 
                            value={firstName}
                            onChangeText={setFirstName}
                            />
                    </View>
                    <Text style={[styles.formLabel, styles.font]}>Last name</Text>
                    <View style={styles.inputBox}>
                        <TextInput styles={styles.input} 
                            value={lastName}
                            onChangeText={setLastName}/>
                    </View>
                    <Text style={[styles.formLabel, styles.font]}>Email</Text>
                    <View style={styles.inputBox}>
                        <TextInput styles={styles.input} 
                            value={email}
                            onChangeText={setEmail}
                            keyboardType={'email-address'} 
                        />
                    </View>
                    <Text style={[styles.formLabel, styles.font]}>Phone number</Text>
                    <View style={styles.inputBox}>
                        <MaskedTextInput 
                            styles={styles.input} 
                            value={phone}
                            mask="(999) 999-9999"
                            keyboardType={'phone-pad'} 
                            onChangeText={ setPhone }
                        />
                    </View>

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
                        <Pressable 
                            onPress={clearForm}
                            style={({pressed}) => [styles.buttonView, { backgroundColor: pressed ? '#495E57' : '#fff' }]}
                            >
                            <Text 
                                style={({pressed}) => [styles.buttonText, { color: pressed ? '#fff' : '#495E57' }]}
                            >Discard changes</Text>
                        </Pressable>
                        <Pressable 
                            style={({pressed}) => [styles.buttonView, { backgroundColor: pressed ? '#495E57' : '#fff' }]}
                            onPress={saveForm}>
                            <Text 
                                style={({pressed}) => [styles.buttonText, { color: pressed ? '#fff' : '#495E57' }]}
                            >Save changes</Text>
                        </Pressable>
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
    buttonView: { 
        flex: 0.5,
        marginRight: 10,
        padding: 8,
        borderRadius: 5,
        borderColor: '#495E57',
        borderWidth: 1,
        marginBottom: 20,
    },
    buttonText: {
        alignSelf: 'center',
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
    inputBox: {
        borderColor: "#eee", 
        borderWidth: 3,
        borderRadius: 5,
        paddingTop: 10,
        paddingLeft: 5,
        width: '100%',
         height: 40,
    },
    input: {
        alignSelf: 'center',
        height: 40,
        width: '100%',
        padding: 0,
        width: '100%',
        textAlignVertical: 'center',
    },     
    font: {
        fontFamily: 'Karla',
        fontWeight: 'regular',
    },
    formLabel: {
        fontSize: 12, 
        color: '#333',
        marginTop: 20,
        marginBottom: 5,
        fontWeight: 'bold',
    },
    formView: {
        width: '100%',
        flex: 1,
    },
    profileContainer: {
        alignItems: 'left', 
        borderWidth: 1, 
        borderColor: '#efefee', 
        margin: 10, padding: 10,
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
    changeButton: {
        backgroundColor: '#495E57', 
        height: 35, 
        // width: 60, 
        marginHorizontal: '1%', 
        borderRadius: 5,
        marginRigth: 20,
    },
    changeButtonText: {
        textAlign: 'center',  
        color: '#fff', 
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    removeButton: {
        backgroundColor: '#fff', 
        height: 35, 
        // width: 60,
        borderColor: '#333',
        borderWidth: 0.5,
        marginHorizontal: 10,
        paddingHorizontal: 10,
    },
    removeButtonText: {
        textAlign: 'center', 
        color: '#333', 
        paddingVertical: 10,
    },
});

export default Profile;