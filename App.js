import React, { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { Button, TextInput, Text, Surface, Snackbar, HelperText } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import {myStyles, gradientColors, snackbarColors} from './utils/myStyles'
import { colorThemes } from './utils';
import validator from 'validator';
import { useFonts } from 'expo-font';
import {app, authErrorCodes, auth} from './firebase/config'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Registro from './components/Registro';
import MainScreen from './components/Main';
import Modulos from './components/Modulos';
import Questao from './components/Questao';
import Dificuldade from './components/Dificuldade';
import Loja from './components/Loja';
import Inventario from './components/Inventario';
import Premium from './components/Premium';
import Conquistas from './components/Conquistas';
import Perfil from './components/Perfil';
import Notas from './components/Notas';
import TesteInicial from './components/TesteInicial';
import ProgressBarScreen from './components/Progresso';
import Fundamentacao from './components/Fundamentacao';
import Desafio from './components/Desafio';
import Erradas from './components/Erradas';
import Teste from './components/Teste';
import Ad from './components/Ad';

import { enGB, registerTranslation } from 'react-native-paper-dates'

import { createOffensiveIfInexistent } from './utils/offensive';
import ContentFundamentation from './components/ContentFundamentation';

const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'RobotoMono': require('./assets/RobotoMono-VariableFont_wght.ttf'),
    'Orbitron': require('./assets/Orbitron-VariableFont_wght.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  registerTranslation('en-UK', enGB);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ title: 'Registro' }}
        />
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{ title: 'Main' }}
        />
        <Stack.Screen
          name="Modulos"
          component={Modulos}
          options={{ title: 'Modulos' }}
        />
        <Stack.Screen
          name="Questao"
          component={Questao}
          options={{ title: 'Questao' }}
        />
        <Stack.Screen
          name="Desafio"
          component={Desafio}
          options={{ title: 'Desafio' }}
        />
        <Stack.Screen
          name="Erradas"
          component={Erradas}
          options={{ title: 'Erradas' }}
        />
        <Stack.Screen
          name="Teste"
          component={Teste}
          options={{ title: 'Teste' }}
        />
        <Stack.Screen
          name="Dificuldade"
          component={Dificuldade}
          options={{ title: 'Dificuldade' }}
        />
        <Stack.Screen
          name="Loja"
          component={Loja}
          options={{ title: 'Loja' }}
        />
        <Stack.Screen
          name="Inventario"
          component={Inventario}
          options={{ title: 'Inventario' }}
        />
        <Stack.Screen
          name="Premium"
          component={Premium}
          options={{ title: 'Premium' }}
        />
        <Stack.Screen
          name="Conquistas"
          component={Conquistas}
          options={{ title: 'Conquistas' }}
        />
        <Stack.Screen
          name="Perfil"
          component={Perfil}
          options={{ title: 'Perfil' }}
        />
        <Stack.Screen
          name="Ad"
          component={Ad}
          options={{ title: 'Ad' }}
        />
        <Stack.Screen
          name="Notas"
          component={Notas}
          options={{ title: 'Notas' }}
        />       
        <Stack.Screen
          name="TesteInicial"
          component={TesteInicial}
          options={{ title: 'TesteInicial' }}
        />
        <Stack.Screen
          name="Progresso"
          component={ProgressBarScreen}
          options={{ title: 'Progresso' }}
        />
        <Stack.Screen
          name="Fundamentacao"
          component={Fundamentacao}
          options={{ title: 'Fundamentacao' }}
        />
        <Stack.Screen
          name="ContentFundamentation"
          component={ContentFundamentation}
          options={{ title: 'ContentFundamentation' }}
        />
        </Stack.Navigator>
    </NavigationContainer>
  );
}

function LoginScreen({ navigation }) {

  const _isEmailValid = (email) => {
    return validator.isEmail(email) || email === '' ;
  };

  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordSecureEntry, setpasswordSecureEntry] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('')

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //const user = userCredential.user;
        createOffensiveIfInexistent();
        navigation.navigate('Main');
      })
      .catch((error) => {
        //console.error(error.code);
        setSnackbarMessage(authErrorCodes[error.code]);
        setSnackbarVisible(true);
      });
  };

  const handleRegister = () => {
    navigation.navigate('Registro');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={gradientColors}
        style={styles.background}
      > 
        <Surface style={styles.login} elevation={0}>
          <Text style={[myStyles.header, {marginBottom: '7%'}]}>Login</Text>
          <Text style={myStyles.labels}>E-mail:</Text>
           <TextInput
            style={[styles.input, { marginBottom: 0 }]}
            underlineColor = "#000000"
            activeUnderlineColor = "#000000"
            label="Digite seu e-mail"
            placeholder="E-mail"
            value={email}
            onChangeText={(text) => setemail(text)}
            error={!_isEmailValid(email)}
          />
          <View style={{ padding: 0, margin: 0 }}>
            <HelperText
              type="error"
              visible={!_isEmailValid(email)}
            >
              <Text>Erro: E-mail Inválido</Text>
            </HelperText>
          </View>
          <Text style={myStyles.labels}>Senha:</Text>
          <TextInput
            style={styles.input}
            underlineColor = "#000000"
            activeUnderlineColor = "#000000"
            label="Digite sua senha"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={passwordSecureEntry}
            right={
              <TextInput.Icon
                icon={passwordSecureEntry ? 'eye' : 'eye-off'}
                onPress={() =>
                setpasswordSecureEntry(!passwordSecureEntry)
                }
                forceTextInputFocus={false}
              />
            }
          />
          <View style={styles.buttons}>
            <Button
              mode="contained-tonal"
              buttonColor={"#17B0E0"}
              onPress={handleLogin}
              style={styles.button}
              disabled={!_isEmailValid(email)}
              icon={({ size, color }) => (
                <MaterialIcons name="login" size={size} color={color} />
            )}
            >
              <Text>Login</Text>
            </Button>
            <Button
              mode="contained-tonal"
              buttonColor={"#17B0E0"}
              onPress={handleRegister}
              style={styles.button}
              icon={({ size, color }) => (
                <MaterialIcons name="how-to-reg" size={size} color={color} />
            )}
            >
              <Text>Registrar</Text>
            </Button>
          </View>
        </Surface>
      </LinearGradient>
      <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          action={{
            label: 'Fechar',
            onPress: () => {
              setSnackbarVisible(false)
            },
          }}
          duration={Snackbar.DURATION_MEDIUM}
          style={{ backgroundColor:snackbarColors['error'] }}
          theme={ colorThemes['red']['dark']}
        >
        <Text>{snackbarMessage}</Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
login: {
  backgroundColor: 'rgba(255, 255, 255, 0.3)',
  width: '85%',
  paddingVertical:30,
  marginHorizontal:'auto',
  marginVertical:'auto',
  borderRadius: 15,
  alignItems: 'center',
  justifyContent: 'center',
},
  input: {
    width: '80%',
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  button: {
    margin: 4,
    width: '45%',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
