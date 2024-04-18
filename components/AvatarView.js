
import { Image, StyleSheet, Text, View } from 'react-native';

function initials(firstName, lastName){
    return firstName && lastName ? firstName[0] + lastName[0] : '';
};

const AvatarView = ({image, firstName, lastName}) => {

    if (image) {
        return (
            <View>
                <Image source={{ uri: image }} style={[styles.avatarImage, styles.imageBase]} />
            </View>
        );
    } else {
       return(
            <View style={[styles.imageDefaultView, styles.imageBase]}>
                <Text style={styles.imageDefaultText}>{initials(firstName, lastName)}</Text>
            </View>   
        );
    }       
};


const styles = StyleSheet.create({
    imageBase: {
        marginRight: 20,
        borderRadius: 40,
        borderColor: '#495E57',
        borderWidth: 1,
        width: 80,
        height: 80,
    },
    imageDefaultText: {
        fontSize: 36,
        color:'#F4CE14',
        alignSelf: 'center',
        paddingTop: 17,
    },
    imageDefaultView: {
        backgroundColor: '#495E57',
         },
    avatarImage: {       
        resizeMode: 'cover',
        backgroundColor: 'gray',
    },
})

export default AvatarView;