import { Image, StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';

const Profile = ({navigation}) => {
    return (
        <View style={{alignItems: 'left', borderWidth: 1, borderColor: '#efefee', margin: 10, padding: 10,backgroundColor: '#fff', borderRadius: 6,}}>            
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Personal Information</Text>

            <Text style={styles.avatarText}>Avatar</Text>
            <View style={styles.profileView} >
                <Image source={require('../assets/profile-tiny.png')} 
                    style={styles.avatarImage}/>
                <View style={styles.changeButton}>
                    <Text style={styles.changeButtonText}>Change</Text>
                </View>
                <View style={styles.removeButton}>
                    <Text style={styles.removeButtonText}>Remove</Text></View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    avatarImage: {
        height: 100, 
        width: 100, 
        resizeMode: 'scale',
        marginRight: 20,
    },
    avatarText: {
        fontSize: 14, 
        fontWeight: 'regular',
        marginVertical: 10,
        color: '#333',
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