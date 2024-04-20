import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return ( (sections.length > 0) &&
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          onPress={() => {
            onChange(index);
          }}
          key={section}
          style={[styles.filterButton,  { backgroundColor: selections[index] ? '#495E57' : '#D5D5D5'}]}>
          <View>
            <Text style={[styles.filterText, {color: selections[index] ? '#edefee' : '#333' }]}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    borderRadius: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderWidth: 1,
    borderColor: 'white',
  },
  
  filtersContainer: {
    backgroundColor: '#efefee',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  filterText: {
    fontFamily: 'KarlaExtraBold',
    fontSize: 13,
    textTransform: 'uppercase',
  }
});

export default Filters;
