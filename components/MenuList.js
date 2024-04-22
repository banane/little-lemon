import {  FlatList, View, } from 'react-native';
import MenuItem from '../components/MenuItem';
import Separator from '../components/Separator';

const MenuList = (data) => {
  

    return(
        <View>           
            <Separator />
            <FlatList 
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => <MenuItem 
                    key={item.id}
                    name={item.name} 
                    description={item.description} 
                    price={item.price} 
                    image={item.image}/>}            
                ItemSeparatorComponent={Separator}
                style={{marginTop: 4,marginLeft: 20,}}
            />
        </View>
    )
};


export default MenuList;