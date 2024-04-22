import {  Alert, FlatList, ScrollView, View, } from 'react-native';
import { useEffect, useState, useCallback, useMemo } from 'react';
import MenuItem from '../components/MenuItem';
import Separator from '../components/Separator';
import Hero from '../components/Hero';
import { createTable, getMenuItems, saveMenuItems, getAllCategories, filterByQueryAndCategories, deleteItems } from '../db/database';
import debounce from 'lodash.debounce';
import { useUpdateEffect  } from '../utils';
import DeliveryHead from './DeliveryHead';
import Filters from './Filters';

const MenuList = () => {
    const [data, setData] = useState([]);
    const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
    const [query, setQuery] = useState('');
    const [sections, setSections] = useState([]);
    const [filterSelections, setFilterSelections] = useState(
        sections.map(() => false)
    );
    

    useEffect(() => {
        (async () => {
            try {
                // await deleteItems();
                await createTable();

                let menuItems = await getMenuItems();
                if (!menuItems.length) {
                    menuItems = await fetchData(); // get from internet
                    saveMenuItems(menuItems); // to db
                    menuItems = await getMenuItems();
                }    
                setData(menuItems);
                // Setup filter data
                const sectionsData = await getAllCategories();
                let sectionArray = sectionsData.map((section) => { return section.category});
                setSections(sectionArray);
                console.log("useEffect data size: " + data.length);
            } catch (e) {
                Alert.alert(e.message);
            }
        })();
    }, []);

    useUpdateEffect(() => {
        (async () => {
            const activeCategories = sections.filter((s, i) => {               
                return filterSelections[i];
            });
            try {
                const filteredMenuItems = await filterByQueryAndCategories(
                    query,
                    activeCategories
                );
                console.log("useUpdateEffect datalength: " + data.length)
                console.log("useUpdateEffect filteredMenuItems   length: " + filteredMenuItems.length)
                setData(filteredMenuItems);
            } catch (e) {
                Alert.alert(e.message);
            }
        })();
    }, [filterSelections, query]);
    
    const lookup = useCallback((q) => {
        setQuery(q);
    }, []);

    const fetchData = async() => {
        console.log("((****************in fetch data");
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

    const onFilterChange = async (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);        
      };

    const handleSearchChange = (text) => {
        setQuery(text);
        debouncedLookup(text);
      };

    return(
        <View>
            <Hero onChangeText={handleSearchChange} queryValue={query}/>
            <DeliveryHead />
            <ScrollView>
                <Filters 
                onChange={onFilterChange} 
                selections={filterSelections} 
                sections={sections} /></ScrollView>
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