import { Text, View, StyleSheet } from 'react-native';

export default function Button({value: value}) {
    return (
        <View style={styles.buttonView}>
           <Text style={styles.buttonText}>{value}</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    buttonView: {
        flex: 0.2, 
        flexDirection: 'row',
        backgroundColor: '#D3D4D3', 
        alignSelf: 'center',
        width: 80,
        borderRadius: 8, 
        paddingRight: 30,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
    },
    buttonText: {
        textAlign: 'center',
        marginLeft: 'auto',
        color:"#333",
        fontSize: 24,
        alignSelf: 'center',
    }
})
