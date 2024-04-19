import {  FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';
import Separator from '../components/Separator';
import { createTable, getMenuItems, saveMenuItems } from '../db/database';

const MenuList = () => {
    const [data, setData] = useState([]);
    const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
  
    useEffect(() => {
        (async () => {
            try {
                await createTable();

                let menuItems = await getMenuItems();
                console.log("menuItems from db: " + menuItems.size);
                if (!menuItems.length) {
                    console.log("no menu items, querying remote");
                    menuItems = await fetchData(); // get from internet
                    saveMenuItems(menuItems); // to db
                }    
                setData(menuItems);
            } catch (e) {
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

    return(
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
            style={{paddingLeft: 20,marginTop: 10,}}
        />
    )
};


export default MenuList;