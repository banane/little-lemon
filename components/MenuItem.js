import { Image, StyleSheet, Text, View} from 'react-native';
import { createTable,getMenuItems, saveMenuItems } from '../db/database.js'

const MenuItem = ({name, description, price, image}) => {
    const imageFilePath = 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/'+image + '?raw=true';
    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });
    return ( 
        <View style={{flexDirection:'row',flex: 1, paddingTop: 20, paddingBottom: 20,}}>
            <View style={{flex: 0.7, alignItems: 'left'}}>
                <Text style={styles.title}>{name}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' 
                    style={styles.description}>{description}</Text>
                <Text style={styles.price}>{USDollar.format(price)}</Text>
            </View>
            <View style={{alignItems: 'flex-end', 
                paddingLeft: 20,flex: 0.3, }}>
                <Image 
                    source={{ uri: imageFilePath}}
                    resizeMode="contain"
                    style={{
                        resizeMode: 'cover',                     
                        height: 120, 
                        width: 120,
                    }} />
            </View>
        </View>)
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'KarlaBold',
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold' || '600',
    }, 
    description: {
        fontFamily: 'Karla',
        fontSize: 16,
        paddingTop: 10,
        color: '#656565',
    }, 
    price: {
        fontFamily: 'Karla',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
        color: '#333'
    },
});


export default MenuItem;