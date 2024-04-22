import { SafeAreaView, ScrollView} from 'react-native';
import { useEffect, useState, useCallback, useMemo } from 'react';
import MenuList from '../components/MenuList';
import DeliveryHead from '../components/DeliveryHead';
import Filters from '../components/Filters';
import Hero from '../components/Hero';
import debounce from 'lodash.debounce';

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
    }

    const handleSearchChange = (text) => {
        setSearchBarText(text);
        debouncedLookup(text);
      };
   
    return(
        <SafeAreaView>
            <Hero onChangeText={handleSearchChange} searchBarText={searchBarText}/> 
              <DeliveryHead />
            <ScrollView>
                 <Filters 
                    onChange={onFilterChange} 
                    selections={filterSelections} 
                    sections={sections} /> 
            </ScrollView>
            
            <MenuList data={data}/>
        </SafeAreaView>
        
    );
};

export default Home;
