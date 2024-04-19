import {  FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';
import { createTable, getMenuItems, saveMenuItems } from '../db/database';

const MenuList = () => {
    const [data, setData] = useState([]);
    const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
  
    useEffect(() => {
        (async () => {
            try {
                await createTable();
                // console.log("table created")
                let menuItems = await getMenuItems();
                // console.log("menuItems from get: description" + menuItems[0].description)
                // console.log("menuitems length: " + menuItems.length);
                // if (!menuItems.length) {
                console.log("no menu items, querying remote");
                 menuItems = await fetchData(); // get from internet
                saveMenuItems(menuItems); // to db
                // }    
    
                setData(menuItems);
            } catch (e) {
                // Handle error
                Alert.alert(e.message);
            }
        })();
        }, []);

    const fetchData = async() => {
        console.log("in fetch data");
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            console.log("in fetchData" + response);
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
            name={item.name} 
            description={item.description} 
            price={item.price} 
            image={item.image}/>}
        keyExtractor={item => item.id}
        
        style={{paddingLeft: 20,marginTop: 10,}}
    />
    )
};


export default MenuList;