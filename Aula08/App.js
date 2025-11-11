import React, { useEffect, useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [avatarUri, setAvatarUri] = useState(null);

  // Solicitar permissões de Camera e Biblioteca
  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const [libraryPermission, requestLibraryPermission] = ImagePicker.useMediaLibraryPermissions();

  useEffect(() => {
    // Pede de forma preguiçosa ao abrir o app
    if (!cameraPermission?.granted) requestCameraPermission();
    if (!libraryPermission?.granted) requestLibraryPermission();
  }, [cameraPermission, libraryPermission]);

  async function abrirCamera() {
    try {
      // Garante permissão
      const camOk = cameraPermission?.granted || (await requestCameraPermission())?.granted;
      if (!camOk) {
        Alert.alert('Permissão necessária', 'Precisamos da câmera para tirar a foto.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        quality: 0.7,
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Não foi possível abrir a câmera.');
    }
  }

  async function abrirGaleria() {
    try {
      // Garante permissão
      const libOk = libraryPermission?.granted || (await requestLibraryPermission())?.granted;
      if (!libOk) {
        Alert.alert('Permissão necessária', 'Precisamos da galeria para escolher a foto.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled) {
        setAvatarUri(result.assets[0].uri);
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Não foi possível abrir a galeria.');
    }
  }

  function resetarAvatar() {
    setAvatarUri(null);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Perfil do Usuário</Text>

      <View style={styles.avatarWrapper}>
        <Image
          source={
            avatarUri
              ? { uri: avatarUri }
              : require('./assets/avatar.png')
          }
          style={styles.avatar}
        />
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.primary]} onPress={abrirCamera}>
          <Text style={styles.buttonText}>Tirar Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondary]} onPress={abrirGaleria}>
          <Text style={styles.buttonText}>Escolher da Galeria</Text>
        </TouchableOpacity>
      </View>

      {avatarUri && (
        <Button title="Remover foto" onPress={resetarAvatar} color="#EF4444" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#0F172A',
  },
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#2563EB',
    backgroundColor: '#E2E8F0',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    minWidth: 160,
    alignItems: 'center',
  },
  primary: { backgroundColor: '#2563EB' },
  secondary: { backgroundColor: '#0EA5E9' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
