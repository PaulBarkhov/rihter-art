import React, { useRef } from "react"
import { Dimensions, StyleSheet, Text, View } from "react-native"
import { Video as VideoPlayer } from "expo-av"

const Video = ({ route, navigation }) => {
  const [video, setVideo] = React.useState()
  React.useEffect(() => {
    const fetchPath = async () => {
      await fetch(`http://192.168.2.114:8000/video/${route.params}`)
        .then(res => res.json())
        .then(res => setVideo(res))
    }
    fetchPath()
  }, [])


  const videoRef = useRef(null);

  if (video) return (

    <VideoPlayer
      ref={videoRef}
      style={styles.video}
      source={{
        uri: video.files[2].link
      }}
      resizeMode={video.RESIZE_MODE_CONTAIN}
      useNativeControls
      resizeMode="cover"
      shouldPlay
    />
  )
  else return <Text>Loading</Text>
}

const styles = StyleSheet.create({
  video: {
    padding: 0,
    width: Dimensions.get("screen").width,
    height: '100%'
    // height: Dimensions.get("screen").height,
  },
})

export default Video
