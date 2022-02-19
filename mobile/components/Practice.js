import { StyleSheet, View, Text, Button, Image, TextInput, KeyboardAvoidingView, ScrollView, Dimensions, Pressable } from 'react-native'
import { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import ImageModal from 'react-native-image-modal';
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from 'expo-av';

const Practice = ({ route }) => {
    const [images, setImages] = useState([])
    const [recording, setRecording] = useState()
    const [soundUri, setSoundUri] = useState()
    const [inputValue, setInputValue] = useState('Введите текст')

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            // allowsEditing: true,
            // aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImages(prev => [...prev, result.uri])
        }
    }

    // need to figure out await for this function
    const send = async () => {
        images.map(image => {
            let localUri = image
            let filename = localUri.split('/').pop()
            let match = /\.(\w+)$/.exec(filename)
            let type = match ? `image/${match[1]}` : `image`
            let formData = new FormData()
            formData.append('photo', { uri: localUri, name: filename, type })
            fetch(`http://192.168.2.114:8000/lesson/${route.params.id}/upload_photo`, {
                method: 'POST',
                body: formData,
                headers: {
                    'content-type': 'multipart/form-data',
                },
            })
                .then(res => console.log(res.status))
        })

    }

    if (images) images.map(image => console.log(image))

    const startRecording = async () => {
        try {
            console.log('Requesting permissions..');
            await Audio.requestPermissionsAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });
            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(
                Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
            );
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    const stopRecording = async () => {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording stopped and stored at', uri);
        setSoundUri(uri)
    }

    const playSound = async () => {
        // const sound = await Audio.Sound.createAsync(
        //     require(soundUri)
        //  );
        // await sound.playAsync()
    }


    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.header}>{route.params.name}</Text>
                <Text style={styles.description}>{route.params.excersize}</Text>
            </View>

            <KeyboardAvoidingView>
                <TextInput
                    style={styles.TextInput}
                    multiline
                    editable
                    numberOfLines={4}
                    value={inputValue}
                    onChangeText={text => setInputValue(text)}
                />
                <View style={styles.photos}>
                    {images && images.map((image, i) => <View key={i}>

                        <ImageModal
                            imageBackgroundColor="white"
                            style={{
                                width: Dimensions.get("screen").width / 3 - 12,
                                aspectRatio: 1 / 1,
                                margin: 2,
                                marginTop: 10
                            }}
                            source={{
                                uri: image,
                            }}
                        />

                        <Pressable
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: 10,
                                zIndex: 3,
                                elevation: 3
                            }}
                            onPress={() => setImages(prev => prev.filter(img => img !== image))}
                        >

                            <MaterialIcons
                                name="close"
                                size={25}
                                color="red"
                            />
                        </Pressable>

                    </View>
                    )}
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Button title="Загрузить фото" onPress={pickImage} />
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Button title="Записать голос" onPress={startRecording} />
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Button title="Стоп" onPress={stopRecording} />
                </View>
                <View style={{ marginBottom: 10 }}>
                    <Button title="Воспроизвести" onPress={playSound} />
                </View>
                <Button onPress={send} title="Отправить" />
            </KeyboardAvoidingView>

        </ScrollView>
    )
}

export default Practice

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
    TextInput: {
        padding: 10,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'grey',
        textAlignVertical: 'top'
    },
    photos: {
        marginBottom: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})