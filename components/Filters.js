import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
    
    return ( 
        (sections.length > 0) &&
            <View style={styles.filtersContainer}>
            {
                sections.map((section, index) => (                     

                    <TouchableOpacity
                        onPress={() => {
                            onChange(section);
                        }}
                        key={index}
                        style={[styles.filterButton,  { backgroundColor: selections.includes(section) ? '#495E57' : '#D5D5D5'}]}>
                        <View>
                            <Text style={[styles.filterText, {color: selections.includes(section) ? '#edefee' : '#333' }]}>
                            {section}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
                )
            }
            </View>
    );
};

const styles = StyleSheet.create({
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 16,
    paddingTop: 6,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: 'white',
    height: 30,
  },
  
  filtersContainer: {
    height: 40,
    justifyContent: 'space-between',
    backgroundColor: '#efefee',
    marginLeft: 20,
    flexDirection: 'row',
  },
  filterText: {
    fontFamily: 'KarlaExtraBold',
    fontSize: 13,
    textTransform: 'capitalize',
  }
});

export default Filters;
