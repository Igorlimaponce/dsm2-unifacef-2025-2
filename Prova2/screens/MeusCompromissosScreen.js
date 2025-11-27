import { View, Text, FlatList, StyleSheet } from 'react-native';

// Também utilizei dados mockados aqui para facilitar a visualização dos compromissos
// para teste assim fica otimo
const compromissos = [
  { id: '1', hora: '09:30:', descricao: 'Reunião "Daily"' },
  { id: '2', hora: '14:00:', descricao: 'Reunião com cliente Carros & Carros' },
  { id: '3', hora: '16:30:', descricao: 'Prazo final Projeto X' },
];

const MeusCompromissosScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.hora}>{item.hora}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Igor Lima Ponce</Text>
      <Text style={styles.header}>Engenharia de Software - A</Text>
      <FlatList
        data={compromissos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.lista}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  lista: {
    marginTop: 16,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  hora: {
    width: 70,
    fontWeight: 'bold',
  },
  descricao: {
    flex: 1,
  },
});

export default MeusCompromissosScreen;
