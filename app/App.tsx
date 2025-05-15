import React, { useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { View, StyleSheet, StatusBar, TouchableOpacity } from "react-native"
import SoundPlayer from "react-native-sound-player"
import Icon from "react-native-vector-icons/MaterialIcons"

const App = () => {
    //
    const [isPlaying, setIsPlaying] = useState(false)
    const [prevSound, setPrevSound] = useState<string | null>(null)

    // play sound
    const playSound = () => {
        try {
            // to update button
            setIsPlaying(true)

            // select random sound not the same as the previous one
            let randomSound =
                soundList[Math.floor(Math.random() * soundList.length)]
            while (randomSound === prevSound) {
                randomSound =
                    soundList[Math.floor(Math.random() * soundList.length)]
            }
            setPrevSound(randomSound)

            // play file from folder
            SoundPlayer.playSoundFile(randomSound, "mp3")
        } catch (e) {
            setIsPlaying(false)
        }
    }

    // stop sound
    const stopSound = () => {
        try {
            SoundPlayer.stop()
            setIsPlaying(false)
        } catch (e) {
            console.log("Stop sound error:", e)
        }
    }

    // Set up event listener for when audio finishes playing
    useEffect(() => {
        const onFinishedPlayingSubscription = SoundPlayer.addEventListener(
            "FinishedPlaying",
            ({ success }) => {
                if (success && isPlaying) {
                    playSound()
                }
            },
        )

        // Clean up when component unmounts
        return () => {
            onFinishedPlayingSubscription.remove()
        }
    }, [isPlaying])

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
                <View style={styles.container}>
                    {isPlaying ? (
                        <TouchableOpacity
                            style={[styles.button, styles.stopButton]}
                            onPress={stopSound}
                        >
                            <Icon name="stop" size={120} color="white" />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[styles.button, styles.playButton]}
                            onPress={playSound}
                        >
                            <Icon name="play-arrow" size={120} color="white" />
                        </TouchableOpacity>
                    )}
                </View>
            </SafeAreaView>
        </>
    )
}

// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        padding: 20,
        width: "100%",
    },
    text: {
        fontSize: 100,
        fontWeight: "bold",
        color: "red",
        textAlign: "center",
    },
    button: {
        padding: 25,
        borderRadius: 10,
        width: "100%",
        height: 200,
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    playButton: {
        backgroundColor: "green",
    },
    stopButton: {
        backgroundColor: "red",
    },
    buttonText: {
        color: "white",
        fontSize: 18,
        fontWeight: "bold",
    },
})

// sound list
const soundList = [
    "sodis_001",
    "sodis_114",
    "sodis_113",
    "sodis_112",
    "sodis_111",
    "sodis_110",
    "sodis_109",
    "m3egly_many",
    "shreem_108",
    "shreem_107",
    "shreem_106",
    "shreem_105",
    "shreem_104",
    "shreem_103",
    "shreem_102",
    "shreem_101",
    "m3egly_100",
    "m3egly_many",
    "m3egly_099",
    "m3egly_098",
    "m3egly_097",
    "m3egly_096",
    "m3egly_095",
    "m3egly_094",
    "m3egly_093",
    "m3egly_092",
    "m3egly_091",
    "m3egly_090",
    "m3egly_089",
    "m3egly_088",
    "m3egly_087",
    "m3egly_086",
    "m3egly_085",
    "m3egly_084",
    "m3egly_083",
    "m3egly_082",
    "m3egly_081",
    "m3egly_080",
    "m3egly_079",
    "m3egly_078",
    "m3egly_many",
]

export default App
