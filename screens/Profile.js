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
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const Profile = ({navigation}) => {
    const [firstName, onFirstNameChange] = useState('');
    const [lastName, onLastNameChange] = useState('');
    const [email, onEmailChange] = useState('');
    const [phone, onPhoneChange] = useState('');

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
   
    const clearForm = ({}) =>  {
        onLastNameChange('');
        onFirstNameChange('');
        onEmailChange('');
        onPhoneChange('');
        console.log("clear form");
    };
    const saveForm = ({}) => {
        console.log("save form");
    };


    return (
       <ScrollView>
        <KeyboardAvoidingView 
                    style={styles.profileContainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={[styles.sectionTitle, styles.font]}>Personal information</Text>

            <Text style={[styles.avatarText,styles.font]}>Avatar</Text>
            <View style={styles.profileView} >
                <Image source={require('../assets/profile-tiny.png')} 
                    style={styles.avatarImage}/>
                <View style={styles.changeButton}>
                    <Text style={styles.changeButtonText}>Change</Text>
                </View>
                <View style={styles.removeButton}>
                    <Text style={[styles.removeButtonText,styles.font]}>Remove</Text></View>
            </View>
            <View style={styles.formView} >
                <Text style={[styles.formLabel, styles.font]}>First name</Text>
                <View style={styles.inputBox}>
                    <TextInput styles={styles.input} 
                        value={firstName}
                        onChange={onFirstNameChange}
                        />
                </View>
                <Text style={[styles.formLabel, styles.font]}>Last name</Text>
                <View style={styles.inputBox}>
                    <TextInput styles={styles.input} 
                        value={lastName}
                        onChange={onLastNameChange}/>
                </View>
                <Text style={[styles.formLabel, styles.font]}>Email</Text>
                <View style={styles.inputBox}><TextInput styles={styles.input} 
                    value={email}
                    onChange={onEmailChange}
                    keyboardType={'email-address'} 
                    />
                </View>
                <Text style={[styles.formLabel, styles.font]}>Phone number</Text>
                <View style={styles.inputBox}>
                    <TextInput styles={styles.input} 
                        value={phone}
                        onChange={onPhoneChange}
                        keyboardType={'email-address'} 
                    />
                </View>

                <Text style={[styles.sectionTitle, styles.font, {marginTop: 20,}]}>Email notifications</Text>
                <View style={styles.checkmarkView}>
                    <Pressable
                        onPress={updateState('orderStatuses')}>
                        <Ionicons 
                            name={ preferences.orderStatuses ? "checkbox" : "checkbox-outline" }                             
                            size={20} 
                            color="#495E57" 
                            style={styles.checkmark} />
                    </Pressable>
                    <Text>Order statuses</Text>
                </View>
                <View style={styles.checkmarkView}>
                    <Pressable
                        onPress={updateState('passwordChanges')}>
                        <Ionicons 
                            name={ preferences.passwordChanges ? "checkbox" : "checkbox-outline" }                             
                            size={20} 
                            color="#495E57" 
                            style={styles.checkmark} />
                    </Pressable>
                    <Text>Password changes</Text>
                </View>
                <View style={styles.checkmarkView}>
                    <Pressable
                        onPress={updateState('specialOffers')}>
                        <Ionicons 
                            name={ preferences.specialOffers ? "checkbox" : "checkbox-outline" }                             
                            size={20} 
                            color="#495E57" 
                            style={styles.checkmark} />
                    </Pressable>
                    <Text>Special offers</Text>
                </View>
                <View style={styles.checkmarkView}>
                    <Pressable
                        onPress={updateState('newsletter')}>
                        <Ionicons 
                            name={ preferences.newsletter ? "checkbox" : "checkbox-outline" }                             
                            size={20} 
                            color="#495E57" 
                            style={styles.checkmark} />
                    </Pressable>
                   <Text>Newsletter</Text>
                </View>
                <View style={styles.logoutButton}>
                    <Text style={styles.logoutButtonText}> Log out</Text></View>
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
        </KeyboardAvoidingView>
        </ScrollView>
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
    checkmark: {
        marginRight: 15,
    },
    checkmarkView: {
        flexDirection: 'row',
        marginVertical: 8,
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
        // fontFamily: 'KarlaRegular',
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
    },
    sectionTitle: {
        fontSize: 20, 
        fontWeight: 'bold',
    },
    avatarImage: {
        height: 100, 
        width: 100, 
        resizeMode: 'cover',
        marginRight: 20,
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