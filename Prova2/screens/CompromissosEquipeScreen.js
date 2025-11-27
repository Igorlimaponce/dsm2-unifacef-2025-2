import { View, Text, SectionList, StyleSheet } from 'react-native';

// Aqui eu decidi fazer dados mockados dentro de uma constante
// para facilitar a visualização dos compromissos da equipe (também ajuda muito para fazer testes apenas de frontend)
const dadosEquipe = [
  {
    title: '(Eu)',
    data: [
      { id: '1', hora: '09:30:', descricao: 'Reunião "Daily"' },
      { id: '2', hora: '14:00:', descricao: 'Reunião com cliente Carros & Carros' },
      { id: '3', hora: '16:30:', descricao: 'Prazo final Projeto X' },
    ],
  },
  {
    title: 'Jurema (chefe)',
    data: [
      { id: '4', hora: '09:30:', descricao: 'Reunião "Daily"' },
      { id: '5', hora: '12:00:', descricao: 'Almoço com a diretoria' },
      { id: '6', hora: '15:00:', descricao: 'Saída Viagem' },
    ],
  },
  {
    title: 'Aderbal',
    data: [
      { id: '7', hora: '09:30:', descricao: 'Reunião "Daily"' },
      { id: '8', hora: '13:30:', descricao: 'Visita técnica Uni-FACEF' },
      { id: '9', hora: '16:30:', descricao: 'Prazo final Projeto X' },
    ],
  },
];

const CompromissosEquipeScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.hora}>{item.hora}</Text>
      <Text style={styles.descricao}>{item.descricao}</Text>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.sectionHeader}>{section.title}</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Igor Lima Ponce</Text>
      <Text style={styles.header}>Engenharia de Software - A</Text>
      <SectionList
      // Aqui eu decidi usar SectionList para agrupar os compromissos por pessoa
      // Fiz dessa forma para melhorar a organização visual dos compromissos
        sections={dadosEquipe}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
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
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
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

export default CompromissosEquipeScreen;
