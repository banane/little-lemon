import { Image, View } from 'react-native';

const Header = () => {
    return (
        <View style={{flex: 0.10, backgroundColor: '#edefee', width: '100%', paddingTop: 40}}>
           <Image source={require('../assets/Logo.png')} style={{alignSelf: 'center'}}/>
        </View>

    );
};

export default Header;
