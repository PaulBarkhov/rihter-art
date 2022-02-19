import { StyleSheet, Dimensions } from 'react-native'

const GlobalStyles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato',
    },
    button: {
        marginVertical: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: 'tomato',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '700'
    },
    form: {
        padding: 30,
        width: Dimensions.get('screen').width - 60,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 15
    },
    header: {
        fontSize: 30,
        marginBottom: 30,
        fontFamily: 'sans-serif',
        fontWeight: '700',
        color: 'black'
    },
    input: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        padding: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white',
        fontFamily: 'sans-serif'
    },
})

export default GlobalStyles