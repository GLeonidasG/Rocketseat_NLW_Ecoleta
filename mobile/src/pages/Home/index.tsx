
import React from 'react'
import { Text, View, StyleSheet, ImageBackground, Image } from 'react-native'
import { Ubuntu_700Bold, useFonts } from "@expo-google-fonts/ubuntu"
import { Roboto_400Regular, Roboto_500Medium } from "@expo-google-fonts/roboto"
import { RectButton } from 'react-native-gesture-handler'
import { AppLoading } from 'expo'
import { Feather } from '@expo/vector-icons'
import Constants from 'expo-constants'

const Home = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Ubuntu_700Bold,
    Roboto_400Regular,
    Roboto_500Medium
  })

  if (!fontsLoaded) {
    return (<AppLoading />)
  }

  return (
    <ImageBackground
      source={require('../../assets/home-background.png')}
      imageStyle={{ width: 274, height: 368 }}
      style={styles.container}
    >
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} ></Image>
        <Text style={styles.title}>O seu ponto de coleta de resíduos recicláveis</Text>
        <Text style={styles.description}>Ajudamos nossos usuários a encontrarem um ponto de coleta de forma eficiente.</Text>
      </View>
      <RectButton style={styles.button} >
        <Text style={styles.buttonIcon}>
          <Feather name="log-in" size={30} ></Feather>
        </Text>
        <Text style={styles.buttonText} onPress={() => { navigation.navigate('Points') }} >Procurar</Text>
      </RectButton>

    </ImageBackground>
  )
}
export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 36 + Constants.statusBarHeight,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    padding: 15,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});