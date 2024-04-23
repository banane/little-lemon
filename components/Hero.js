import { Image, StyleSheet, Text, View} from 'react-native';
import { Searchbar } from 'react-native-paper';


const Hero = ({setSearchInput}) => {
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
            <Searchbar
                onChangeText={setSearchInput}
                style={styles.searchBar}
                iconColor="#495E57"
                inputStyle={{ color: '#495E57', paddingBottom: 25}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#edefee',
        shadowRadius: 0,
        shadowOpacity: 0,
        marginTop: 10,
        marginBottom: 10,
        height: 30,
      },
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
       paddingLeft: 20,
       paddingRight: 20,
       backgroundColor: '#495E57',
    },
    title: {
        color: '#F4CE14',
        fontSize: 54,
        fontFamily: 'Markazi'

    },
    subtitle: {
        fontFamily: 'Markazi',
        fontSize: 40,
        marginTop: -10,
        color: '#fff'
    },
    paragraph: {
        fontFamily: 'Karla',
        fontSize: 18,
        color: '#fff'
    }

});

export default  Hero;
