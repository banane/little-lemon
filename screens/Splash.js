
import { Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Splash = ({navigation}) => {


    return (
        <View style={{alignItems:'center', marginTop: 100,}}>
            <Image source={require('../assets/Logo.png')} />
            <Ionicons name="checkbox" size={20} color="#333" />
        </View>
    )
};

export default Splash;