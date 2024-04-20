import {StyleSheet, TextInput, Text, View} from 'react-native';
import { MaskedTextInput } from "react-native-mask-text";

const CustomInput = ({name, value, onChange, ...args}) => {

    return ( 
        <View>
            <Text style={[styles.formLabel, styles.font]}>{name}</Text>
            <View style={styles.inputBox}>
                { (name == 'Phone') ? 
                <MaskedTextInput  
                    mask="(999) 999-9999" 
                    value={value} 
                    onChangeText={onChange} 
                    styles={styles.input}  {...args} 
                /> :
                <TextInput 
                    styles={styles.input} 
                    value={value}
                    onChangeText={onChange}                  
                    {...args}
                />   }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default CustomInput;

// keyboardType={'email-address'} 