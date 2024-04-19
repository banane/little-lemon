
import { Image, StyleSheet, Text, View, Pressable } from 'react-native';

function initials(firstName, lastName){
    return firstName && lastName ? firstName[0] + lastName[0] : '';
};

const AvatarView = ({image, firstName, lastName, small = false, onPress}) => {

    if (image) {
        return (
            <Pressable onPress={onPress}>
                <Image source={{ uri: image }} style={[styles.avatarImage, styles.imageBase,
                { borderRadius: small ? 15 : 40, width: small ? 30 : 80, height: small? 30 : 80, marginRight: small ? 10 : 20 }
                ]} />
            </Pressable>
        );
    } else {
       return(
            <Pressable onPress={onPress} style={[styles.imageDefaultView, styles.imageBase, {
                borderRadius: small ? 15 : 40, width: small ? 30 : 80, height: small? 30 : 80, marginRight: small ? 10 : 20
            } ]}>
                <Text style={[styles.imageDefaultText,{ fontSize: small ? 14 : 36, paddingTop: small ? 7 : 17}]}>{initials(firstName, lastName)}</Text>
            </Pressable>   
        );
    }       
};


const styles = StyleSheet.create({
    imageBase: {
        borderColor: '#495E57',
        borderWidth: 1,       
    },
    imageDefaultText: {
        color:'#F4CE14',
        alignSelf: 'center',
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