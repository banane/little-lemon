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
    const [query, setQuery] = useState('');
    const [searchBarText, setSearchBarText] = useState('');
    const [sections, setSections] = useState([]);
    const [filterSelections, setFilterSelections] = useState(
        sections.map(() => false)
    );

    useEffect(() => {
        (async () => {
            try {
                await createTable();

                // Setup menu items data
                let menuItems = await getMenuItems();
                if (!menuItems.length) {
                    menuItems = await fetchData(); // get from internet
                    saveMenuItems(menuItems); // to db
                    menuItems = await getMenuItems();
                }    
                setData(menuItems);
                console.log("data size: " + data.length);

                // Setup filter data
                const sectionsData = await getAllCategories();
                let sectionArray = sectionsData.map((section) => { return section.category});
                setSections(sectionArray);
            } catch (e) {
                Alert.alert(e.message);
            }
        })();
    }, []);

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

    const lookup = useCallback((q) => {
        setQuery(q);
      }, []);
    
    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const onFilterChange = (index) => {
        const arrayCopy = [...filterSelections];
        arrayCopy[index] = !filterSelections[index];
        setFilterSelections(arrayCopy);        
        updateMenuItems();
    };

    const updateMenuItems = async() => {
        const filteredMenuItems = await filterByQueryAndCategories(
            query,
            activeCategories
        );
        setData(filteredMenuItems);
        console.log("filteredMenuItems: " + filteredMenuItems.length);
    }

    const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
      };
   
    return(
        <SafeAreaView>
            <Hero onChangeText={handleSearchChange} searchBarText={searchBarText}/> 
            <DeliveryHead />
            <ScrollView horizontal={true} >
                 <Filters 
                    onChange={onFilterChange} 
                    selections={filterSelections} 
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
