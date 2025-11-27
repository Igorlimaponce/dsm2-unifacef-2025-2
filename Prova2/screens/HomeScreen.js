import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agenda do dia</Text>
      <Text style={styles.subtitle}>Igor Lima Ponce</Text>
      <Text style={styles.subtitle}>Engenharia de Software - A</Text>
      <View style={styles.buttons}>
        <Button
          title="Meus compromissos"
          onPress={() => navigation.navigate('MeusCompromissos')}
        />
        <Button
          title="Compromissos da equipe"
          onPress={() => navigation.navigate('CompromissosEquipe')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 4,
  },
  buttons: {
    marginTop: 24,
    gap: 12,
  },
});

export default HomeScreen;
