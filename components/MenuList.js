import {  FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';
    const MenuList = () => {
        const [data, setData] = useState([]);
        const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
        // const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu-items-by-category.json';
   

      useEffect(() => {
        (async () => {
          try {
            // await createTable();
            // let menuItems = await getMenuItems();
           
            // if (!menuItems.length) {
              let menuItems = await fetchData(); // get from internet
            //   saveMenuItems(menuItems); // to db
            // }
    
            // const sectionListData = getSectionListData(menuItems, sections);
    
            setData(menuItems);
            console.log("just set data");
            console.log("menuitems: " + menuItems);
          } catch (e) {
            // Handle error
            Alert.alert(e.message);
          }
        })();
      }, []);

    const fetchData = async() => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            console.log("before jsonning" + response);
            const json = await response.json();

            return json?.menu;
            
        } catch (error) {
            console.error(error);
            return [];
        } 
    }

    return(<FlatList 
        data={data}
        renderItem={({item}) => <MenuItem 
            title={item.name} 
            description={item.description} 
            price={item.price} 
            image={item.image}/>}
        keyExtractor={item => item.id}
        
        style={{paddingLeft: 20,marginTop: 10,}}
    />
        )
};


export default MenuList;