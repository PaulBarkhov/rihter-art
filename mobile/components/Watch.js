import React from "react";
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Button } from 'react-native'
import ImageModal from 'react-native-image-modal';

const Watch = ({ navigation, route }) => {
    const [photos, setPhotos] = React.useState([])

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{route.params.name}</Text>
            <Text style={styles.description}>{route.params.description}</Text>


            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {photos && photos.map(photo => {
                    return (
                        <ImageModal
                            key={photo.id}
                            imageBackgroundColor="white"
                            style={{
                                width: Dimensions.get("screen").width / 3 - 12,
                                aspectRatio: 1 / 1,
                                margin: 2
                            }}
                            source={{
                                uri: photo.url,
                            }}
                        />
                    )
                })
                }
            </View>

            <TouchableOpacity style={styles.watchButton}>
                <Button
                    title={'Смотреть видеоурок'}
                    onPress={() => navigation.navigate("Video", route.params.video)}
                />
            </TouchableOpacity>
        </View>

    )
}

export default Watch

const styles = StyleSheet.create({
    container: {
        margin: 10,
        flex: 1
    },
    header: {
        fontSize: 28,
        fontWeight: '800'
    },
    description: {
        alignSelf: 'flex-start',
        fontSize: 16,
        marginVertical: 10
    },
    watchButton: {
        marginVertical: 10
    }
})