import React from "react"
import { StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, TextInput } from "react-native"
import AuthContext from "../context/AuthContext"
import * as ImagePicker from 'expo-image-picker'
import ImageModal from 'react-native-image-modal'
import GlobalStyles from './GlobalStyles'

const Account = () => {
  const [userData, setUserData] = React.useState()
  const [refresh, setRefresh] = React.useState(false)
  const [image, setImage] = React.useState()
  const [editMode, setEditMode] = React.useState(false)
  const context = React.useContext(AuthContext)

  React.useEffect(() => {
    const fetchUserData = async () => {
      await fetch('http://192.168.2.114:8000/account')
        .then(res => res.json())
        .then(data => setUserData(data))
    }
    fetchUserData()
  }, [refresh])


  const handleProfileImagePress = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri)
    }
  }

  const handleSubmit = async () => {
    if (image) {
      let localUri = image
      let filename = localUri.split('/').pop()
      let match = /\.(\w+)$/.exec(filename)
      let type = match ? `image/${match[1]}` : `image`
      let formData = new FormData()
      formData.append('photo', { uri: localUri, name: filename, type })
      fetch(`http://192.168.2.114:8000/upload_profile_image`, {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
        .then(() => {
          setRefresh(!refresh)
          setImage('')
        })
    }
    setEditMode(false)
  }

  const logout = async () => {
    try {
      await fetch("http://192.168.2.114:8000/logout")
        .then((res) => res.json())
        .then((data) => {
          if (data.isLoggedOut) {
            context.setIsAuthentificated(false);
          } else {
            console.log("Logout failed");
          }
        });
    } catch (error) {
      console.log("Ошибка", error);
    }
  }

  if (!userData) return <Text>Loading</Text>

  if (editMode) return (
    <View style={{ padding: 10 }}>
      <TouchableOpacity onPress={handleProfileImagePress} style={{ width: '100%' }}>
        <Image
          style={{ width: 100, height: 100, borderRadius: 50 }}
          source={
            image ? { uri: image } : { uri: userData.profile_image }

            // userData.profile_image ? { uri: userData.profile_image } : require('../assets/default.png')
          }
        />
      </TouchableOpacity>
      <TextInput style={GlobalStyles.input} value={userData.email} placeholder="Email" />
      <TextInput style={GlobalStyles.input} value={userData.first_name} placeholder="Имя" />
      <TextInput style={GlobalStyles.input} value={userData.last_name} placeholder="Фамилия" />
      <TextInput style={GlobalStyles.input} value={userData.language} placeholder="Язык" />
      <TouchableOpacity style={GlobalStyles.button} onPress={handleSubmit}><Text style={GlobalStyles.buttonText}>Сохранить</Text></TouchableOpacity>

    </View>

  )
  else return (
    <View style={{ padding: 10, alignItems: 'center' }}>
      <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: userData.profile_image } ? { uri: userData.profile_image } : require('../assets/default.png')} />
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 20, fontWeight: '600', margin: 5 }}>{userData.first_name && userData.first_name}</Text>
        <Text style={{ fontSize: 20, fontWeight: '600', margin: 5 }}>{userData.last_name && userData.last_name}</Text>
      </View>
      <Text>{userData.email && userData.email}</Text>
      <Text>{userData.language && userData.language}</Text>
      <TouchableOpacity style={GlobalStyles.button} onPress={() => setEditMode(true)}><Text style={GlobalStyles.buttonText}>Изменить</Text></TouchableOpacity>
      <TouchableOpacity style={GlobalStyles.button} onPress={logout}><Text style={GlobalStyles.buttonText}>Выйти</Text></TouchableOpacity>
      <TouchableOpacity style={GlobalStyles.button} onPress={() => { setRefresh(!refresh) }} ><Text style={GlobalStyles.buttonText}>Перезагрузить</Text></TouchableOpacity>
    </View>
  )

}

export default Account;

const styles = StyleSheet.create({});
