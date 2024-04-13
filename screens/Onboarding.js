import { 
    View, 
    Image, 
    Text, 
    TextInput, 
    StatusBar,
    StyleSheet,
 } from 'react-native';
 import { useFonts } from 'expo-font';
 import Header from '../components/Header';
 import Button from '../components/Button';

const Onboarding = ({}) => {
    const [fontsLoaded] = useFonts({
        'Klarna': require('../assets/fonts/Karla-Regular.ttf'),
      });
    return (
        <View style={{flex: 1, backgroundColor: '#efefee', width: '100%'}}>
            <Header />
            
            <View style={{flex: 0.8, backgroundColor: '#D3D4D3', flexDirection: 'column'}}>                 
                <Text style={[styles.onboardingTitle, styles.bodyText]}>Let us get to know you</Text>
                
                <View style={styles.onboardingForm}>
                    <Text style={styles.bodyText}>First Name</Text>
                    <TextInput style={styles.input}/>
                    <Text style={styles.bodyText}>Email</Text>
                    <TextInput style={styles.input} />
                </View>
            </View>
            <View style={styles.buttonContainer }>
                <Button value="Next"/>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    onboardingForm: {
        flex: 1, 
        justifyContent: 'flex-end', 
        marginBottom: 30
    },
    buttonContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 20,
   },
    input: {
        height: 40,
        width: 250,
        margin: 12,
        borderWidth: 2,
        padding: 10,
        borderRadius: 8,
        alignSelf: 'center',
    },      
    bodyText: {
        color:"#333",
        fontSize: 24,
        alignSelf: 'center',
        // fontFamily: 'Klarna',
    },
    onboardingTitle: {
        paddingTop: 50,
    },
    
  });

export default Onboarding;