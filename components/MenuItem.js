import { Image, StyleSheet, Text, View} from 'react-native';

const MenuItem = ({title, description, price, image}) => {
    console.log("image path: " + image);
    const imageFilePath = 'https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/'+image + '?raw=true';
    console.log("image path: " + imageFilePath);
    return ( 
        <View style={{flexDirection:'row',flex: 1, padding: 20,}}>
            <View style={{flex: 0.7, alignItems: 'left'}}>
                <Text style={styles.title}>{title}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' 
                    style={styles.description}>{description}</Text>
                <Text style={styles.price}>${price}</Text>
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
        fontFamily: 'Karla',
        fontSize: 20,
        color: '#656565',
    }, 
    description: {
        fontFamily: 'Karla',
        fontSize: 16,
        paddingTop: 10,
        borderWidth: 1,
        borderColor: 'yellow',
        color: '#000',
    }, 
    price: {
        fontFamily: 'Karla',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 10,
    },
});


export default MenuItem;