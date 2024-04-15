
import { Image, View } from 'react-native';

const Splash = ({navigation}) => {


    return (
        <View style={{alignItems:'center', marginTop: 100,}}>
            <Image source={require('../assets/Logo.png')} />
        </View>
    )
};

export default Splash;