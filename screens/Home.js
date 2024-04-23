import { FlatList, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import { useEffect, useState, useCallback, useMemo } from 'react';
import DeliveryHead from '../components/DeliveryHead';
import Filters from '../components/Filters';
import Hero from '../components/Hero';
import Separator from '../components/Separator';
import debounce from 'lodash.debounce';
import MenuItem from '../components/MenuItem';

import { createTable, getMenuItems, saveMenuItems, getAllCategories, filterByQueryAndCategories } from '../db/database';


const Home = () => {

    const [data, setData] = useState([]);
    const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';
    const [searchInput, setSearchInput] = useState('');
    const [sections, setSections] = useState([]);
    const [activeFilters, setActiveFilters] = useState([]);

    async function loadMenu() {
        try {
            await createTable();
            // Setup menu items data
            let menuItems = await getMenuItems();
            if (!menuItems.length) {
                menuItems = await fetchData(); // get from internet
                saveMenuItems(menuItems); // to db
                menuItems = await getMenuItems();
            } 
            getSections();
            setData(menuItems);
        } catch (e) {
            Alert.alert(e.message);
        }
    }

    useEffect(() => {
        (async () => {
           loadMenu();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const debouncedFilterMenu = debounce(filterMenu, 500);
            debouncedFilterMenu();
        })();
    }, [searchInput]);

    useEffect(() => {
        (async () => {
           filterMenu();
        })();
    }, [activeFilters]);


    const getSections = async() => {
        try {
            const sectionsData = await getAllCategories();
            let sectionArray = sectionsData.map((section) => { return section.category});
            setSections(sectionArray);
        } catch (e) {
            console.error(e);
        }
    }

    const fetchData = async() => {
        // get data from external source
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

    const onFilterChange = (item) => {
        /* remove from current active filters, or add it, depending */
        let indexOf = activeFilters.indexOf(item);
        if(indexOf < 0) {
            setActiveFilters( activeFilters => [...activeFilters,item]);
        } else {
            const newActiveFilters = activeFilters.filter((_, index) => index != indexOf);
            setActiveFilters(newActiveFilters);
        }
    };

    const filterMenu = async() => {        
        const filteredMenuItems = await filterByQueryAndCategories(
            searchInput,
            activeFilters
        );
        setData(filteredMenuItems);
    }

    return(
        <SafeAreaView>
            <Hero setSearchInput={setSearchInput}/> 
            <DeliveryHead />
            <ScrollView horizontal={true} >
                 <Filters 
                    onChange={onFilterChange} 
                    selections={activeFilters} 
                    sections={sections} /> 
            </ScrollView>
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
                style={styles.menuList}
            />
        </SafeAreaView>
        
    );
};

const styles = StyleSheet.create({
    menuList: {
        marginTop: 4,
        marginLeft: 20, 
        backgroundColor: '#edefee', 
        height: '40%',
        marginRight: 20,
    }
});

export default Home;
