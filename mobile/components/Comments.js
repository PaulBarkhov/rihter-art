import React from 'react'
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Comment from './Comment'
import GlobalStyles from './GlobalStyles'

const Comments = ({ route, navigation }) => {
    const [comments, setComments] = React.useState([])
    const [inputValue, setInputValue] = React.useState('')

    React.useEffect(() => {
        const fetchComments = async () => {
            await fetch(`http://192.168.2.114:8000/lesson/${route.params.id}/comments`)
                .then(res => res.json())
                .then(res => setComments(res))
        }
        fetchComments()
    }, [])

    const sendComment = async () => {
        await fetch(`http://192.168.2.114:8000/lesson/${route.params.id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: inputValue })
        })
            .then(res => res.json())
            .then(res => console.log(res))

    }

    return (
        <View style={styles.container}>
            <View>
                {comments && comments.map(comment => {
                    return (
                        <Comment key={comment.id} user_id={comment.user_id} />
                    )
                })}
            </View>
            <KeyboardAvoidingView style={{ flexDirection: 'row' }}>
                <TextInput
                    style={styles.TextInput}
                    editable
                    placeholder='Введите текст сообщения'
                    value={inputValue}
                    onChangeText={text => setInputValue(text)}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={GlobalStyles.buttonText} onPress={sendComment}>{inputValue ? 'Send' : 'Voice'}</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Comments

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flex: 1,
        height: '100%',
        justifyContent: 'space-between'
    },
    TextInput: {
        padding: 10,
        flex: 7,
        marginRight: 5,
        backgroundColor: 'white',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'grey',
        textAlignVertical: 'center',
        fontSize: 16,
        fontWeight: '400',
        paddingHorizontal: 20
    },
    button: {

        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'tomato',
        borderRadius: 50
    }
})
