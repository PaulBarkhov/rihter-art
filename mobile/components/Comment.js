import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Comment = ({ user_id }) => {
    const [userData, setUserData] = React.useState()

    React.useLayoutEffect(() => {
        const fetchUserData = async (id) => {
            await fetch(`http://192.168.2.114:8000/profile/${id}`)
                .then(res => res.json())
                .then(res => setUserData(res))
        }
        fetchUserData(user_id)
    }, [])


    if (!userData) return <Text></Text>
    return (
        <View style={styles.commentView}>
            <Text style={{ fontSize: 20 }}>{userData.first_name} {userData.last_name}</Text>
        </View>
    );
};

export default Comment;

const styles = StyleSheet.create({
    commentView: {
        margin: 7,
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#e3e3e3',
        borderRadius: 10
    }
});
