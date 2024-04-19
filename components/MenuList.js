import {  FlatList, View, Alert } from 'react-native';
import { useEffect, useState, useCallback, useMemo } from 'react';
import MenuItem from '../components/MenuItem';
import Separator from '../components/Separator';
import Hero from '../components/Hero';
import { createTable, getMenuItems, saveMenuItems, deleteItems, filterByQueryAndCategories } from '../db/database';
import debounce from 'lodash.debounce';
import { useUpdateEffect  } from '../utils';

const MenuList = () => {
    const [data, setData] = useState([]);
    const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
    const [query, setQuery] = useState('');
    const sections = ['Appetizers', 'Salads', 'Beverages']; // move to query of all categories, add categories db col

    useEffect(() => {
        (async () => {
            try {
                // await deleteItems();
                await createTable();

                let menuItems = await getMenuItems();
                // console.log("menuItems from db: price: " + menuItems[0].price);
                if (!menuItems.length) {
                    console.log("********************************** no menu items, querying remote");
                    menuItems = await fetchData(); // get from internet
                    saveMenuItems(menuItems); // to db
                    menuItems = await getMenuItems();
                }    
                setData(menuItems);
            } catch (e) {
                Alert.alert(e.message);
            }
        })();
    }, []);

    useUpdateEffect(() => {
        (async () => {
            const activeCategories = sections;
        //   const activeCategories = sections.filter((s, i) => {
        //     // If all filters are deselected, all categories are active
        //     if (filterSelections.every((item) => item === false)) {
        //       return true;
        //     }
        //     return filterSelections[i];
        //   });
          try {
            const menuItems2 = await filterByQueryAndCategories(
              query,
              activeCategories
            );
            // const sectionListData = getSectionListData(menuItems2, sections);
            // setData(sectionListData);
            setData(menuItems2);
            console.log("**********in useUpdateEffect");
          } catch (e) {
            Alert.alert(e.message);
          }
        })();
      }, [query]);
    
      const lookup = useCallback((q) => {
        setQuery(q);
      }, []);

    const fetchData = async() => {
        console.log("in fetch data");
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const json = await response.json();

            return json?.menu;
            
        } catch (error) {
            console.error(error);
            return [];
        } 
    }

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);


    const handleSearchChange = (text) => {
        console.log("in handle search change");
        setQuery(text);
        debouncedLookup(text);
      };

    return(
        <View>
            <Hero onChangeText={handleSearchChange} queryValue={query}/>

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
        </View>
    )
};


export default MenuList;