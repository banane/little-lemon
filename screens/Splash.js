
import { Image, View } from 'react-native';

const Splash = ({navigation}) => {


    return (
        <View style={{alignItems:'center', marginTop: 100,}}>
            <Image source={require('../assets/splash.png')} />
        </View>
    )
};

export default Splash;