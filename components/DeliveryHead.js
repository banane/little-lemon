import { Text, View} from 'react-native';

const DeliveryHead = () => {
    return (
        <View style={{marginLeft: 20, marginTop: 20, marginBottom: 10,}}>
            <Text style={{
                fontFamily: 'KarlaExtraBold', 
                fontSize: 16, 
                textTransform: 'uppercase'}}>
                    Order for delivery!
                </Text>
        </View>
    )
}

export default DeliveryHead;
