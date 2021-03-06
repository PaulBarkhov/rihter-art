import { StyleSheet, Dimensions, Platform, StatusBar } from 'react-native'

const GlobalStyles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'tomato',
    },
    button: {
        width: '100%',
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'tomato',
        borderColor: 'grey',
        borderWidth: 0.5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '700'
    },
    header: {
        fontSize: 30,
        marginBottom: 30,
        fontFamily: 'sans-serif',
        fontWeight: '700',
        color: 'black'
    },
    input: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        width: '100%',
        padding: 10,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: 'white',
        fontFamily: 'sans-serif'
    },
    redBorderInput: {
        borderColor: 'red',
        borderWidth: 2,
        borderRadius: 5,
        width: '100%',
        paddingLeft: 15,
        paddingTop: 9,
        paddingRight: 15,
        paddingBottom: 9,
        marginBottom: 10,

    },
    inputError: {
        position: 'absolute',
        // left: '50%',
        bottom: -3,
        left: 13,
        paddingLeft: 10,
        paddingTop: 3,
        paddingRight: 10,
        paddingBottom: 3,
        fontSize: 12,
        backgroundColor: 'rgba(216, 24, 24, 0.698)',
        borderRadius: 5,
        color: 'white'
    },
    safe: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})

export default GlobalStyles