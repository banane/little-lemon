import { Text, View} from 'react-native';

const DeliveryHead = () => {
    return (
        <View style={{margin: 10,}}>
            <Text style={{
                fontFamily: 'KarlaExtraBold', 
                fontSize: 20, 
                textTransform: 'uppercase'}}>
                    Order for delivery!
                </Text>
        </View>
    )
}

export default DeliveryHead;
