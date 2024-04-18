import { Text, Pressable, StyleSheet, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const CheckBoxPreference = ({preferenceName, preferenceValue, onChange}) => {
    console.log("value: " + preferenceValue);
    console.log("name: " + preferenceName);
    return (
        <View style={styles.checkmarkView}>
            <Pressable
                onPress={onChange}>
                <Ionicons 
                    name={ preferenceValue ? "checkbox" : "checkbox-outline" }                             
                    size={20} 
                    color="#495E57" 
                    style={styles.checkmark} />
            </Pressable>
            <Text>{preferenceName}</Text>
         </View>
    );
};

const styles = StyleSheet.create({
    checkmark: {
        marginRight: 15,
    },
    checkmarkView: {
        flexDirection: 'row',
        marginVertical: 8,
    },
});

export default CheckBoxPreference;