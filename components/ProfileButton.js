import {Platform, View, Text, Pressable, StyleSheet } from 'react-native';


const ProfileButton = ({title, onPress, priority=false}) => {
    white = '#fff';
    green = '#495E57'
    
    var bgColor ;
    var pressedBgColor;
    if (priority) {
        bgColor = green;
        pressedBgColor = white;
    } else {
        bgColor = white;
        pressedBgColor = green;
    }

    return(
       <View>
        <Pressable 
            style={({pressed}) => [styles.buttonView, { 
                backgroundColor: pressed ? pressedBgColor : bgColor, 
            }]}
            onPress={onPress}>
            <Text style={ { color: priority ? white : green }}>{title}</Text>
        </Pressable>
        </View>
    );
};

export default ProfileButton;


const styles = StyleSheet.create({
    buttonView: { 
        flex: 0.5,
        marginRight: 10,
        borderRadius: 5,
        borderColor: '#495E57',
        borderWidth: 1,
        textAlign: 'center',
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 5,
        paddingBottom: 5,
    },
    buttonText: {
        alignSelf: 'center',
        textAlignVertical: 'center',
        paddingTop: 6,
    },
});