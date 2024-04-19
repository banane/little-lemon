import { Image, StyleSheet, Text, View} from 'react-native';


const Hero = ({onChangeText, searchValue}) => {
    return(
        <View style={styles.herobox}>
            <Text style={styles.title}>Little Lemon</Text>
            <View style={{flexDirection: 'row',}} >
                <View style={{flex: 0.6, paddingTop: 0,marginTop: -12,}}>
                     <Text style={styles.subtitle}>Chicago</Text>
                     <Text style={styles.paragraph}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                 </View>
                 <View style={{flex: 0.4,}}>
                    <Image style={[styles.heroImage,{
                        alignSelf: 'flex-end',
                        
                    }]} source={require('../assets/Hero image.png')}/> 
                  </View>
            </View>
           
        </View>

    );
};

const styles = StyleSheet.create({
    heroLeftText: {
        flex: 0.6,
        color: '#fff',
    },
    rightColumnBox: {
        flex: 0.4,
        alignItems: 'right',
        verticalAlign: 'center',
    },
    heroImage: {
        alignSelf: 'right',
        width: 136,
        height: 136,
        resizeMode:'center',
        borderRadius: 16,
        borderColor: '#000',
        borderWidth: 1,
    },
    twoColumnBox: {
        flowDirection: 'row',
        flex: 1,
    },
    herobox: {
       padding: 20,
       height: 200,
       backgroundColor: '#495E57',
       height: 300,

    },
    title: {
        color: '#F4CE14',
        fontSize: 54,
        fontFamily: 'Markazi'

    },
    subtitle: {
        fontFamily: 'Markazi',
        fontSize: 40,
        color: '#fff'
    },
    paragraph: {
        fontFamily: 'Karla',
        fontSize: 18,
        color: '#fff'
    }

});

export default  Hero;
