import { Text, Pressable, StyleSheet, View} from 'react-native';
import CheckBox from 'expo-checkbox';

const CheckBoxPreference = ({preferenceName, preferenceValue, onChange}) => {

    return (
        <View style={styles.checkmarkView}>
            <CheckBox
                value={preferenceValue}
                onValueChange={onChange}
                disabled={false}
                color="#495E57"
                size={20}
                style={styles.checkmark}

            />

               
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
