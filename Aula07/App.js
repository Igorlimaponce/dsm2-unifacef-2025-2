import React, { useCallback, useMemo, useState } from 'react';
import { View, Text, SectionList, FlatList, StyleSheet, TextInput, useWindowDimensions, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Gerar produtos de exemplo
const CATEGORIAS = ['Eletrônicos', 'Roupas', 'Livros', 'Acessórios'];
const PRODUTOS_BASE = Array.from({ length: 120 }).map((_, i) => {
  const categoria = CATEGORIAS[i % CATEGORIAS.length];
  return {
    id: String(i),
    nome: `Produto ${i}`,
    preco: (Math.random() * 500).toFixed(2),
    categoria,
  };
});

// Component memoizado de Item
const ItemProduto = React.memo(function ItemProduto({ nome, preco, larguraCard }) {
  return (
    <View style={[styles.card, { width: larguraCard }]}> 
      <Text style={styles.nome}>{nome}</Text>
      <Text style={styles.preco}>R$ {preco}</Text>
    </View>
  );
});

export default function App() {
  const { width } = useWindowDimensions();
  const [filtro, setFiltro] = useState('');
  const [modo, setModo] = useState('section'); // 'section' | 'flat'

  // Calcular quantas colunas cabem de forma responsiva
  const colunas = width > 1000 ? 4 : width > 700 ? 3 : width > 480 ? 2 : 1;
  const larguraCardFlat = (width - 32 - (colunas - 1) * 12) / colunas; // padding horizontal + gaps
  const larguraCardSection = width - 32; // seção: ocupar largura toda

  // Filtrar produtos
  const produtosFiltrados = useMemo(() => {
    const f = filtro.trim().toLowerCase();
    if (!f) return PRODUTOS_BASE;
    return PRODUTOS_BASE.filter(p => p.nome.toLowerCase().includes(f));
  }, [filtro]);

  // Agrupar por categoria usando useMemo
  const sections = useMemo(() => {
    const grupos = CATEGORIAS.map(cat => ({ title: cat, data: [] }));
    for (const prod of produtosFiltrados) {
      const grupo = grupos.find(g => g.title === prod.categoria);
      if (grupo) grupo.data.push(prod);
    }
    // Remover categorias vazias após filtro
    return grupos.filter(g => g.data.length > 0);
  }, [produtosFiltrados]);

  const renderSectionHeader = useCallback(({ section }) => (
    <Text style={styles.header}>{section.title}</Text>
  ), []);

  const renderItem = useCallback(({ item }) => (
    <ItemProduto
      nome={item.nome}
      preco={item.preco}
      larguraCard={modo === 'flat' ? larguraCardFlat : larguraCardSection}
    />
  ), [larguraCardFlat, larguraCardSection, modo]);

  const keyExtractor = useCallback(item => item.id, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Catálogo Interativo de Produtos</Text>
      <View style={styles.segment}>
        <TouchableOpacity
          style={[styles.segmentBtn, modo === 'section' && styles.segmentBtnActive]}
          onPress={() => setModo('section')}
        >
          <Text style={[styles.segmentText, modo === 'section' && styles.segmentTextActive]}>Por Categoria</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segmentBtn, modo === 'flat' && styles.segmentBtnActive]}
          onPress={() => setModo('flat')}
        >
          <Text style={[styles.segmentText, modo === 'flat' && styles.segmentTextActive]}>Lista Otimizada</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        value={filtro}
        onChangeText={setFiltro}
        placeholder="Filtrar por nome..."
        placeholderTextColor="#64748B"
        style={styles.input}
      />

      {modo === 'section' ? (
        <SectionList
          sections={sections}
          keyExtractor={keyExtractor}
          renderSectionHeader={renderSectionHeader}
          renderItem={renderItem}
          stickySectionHeadersEnabled
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          // Performance tweaks
          initialNumToRender={20}
          windowSize={10}
          maxToRenderPerBatch={20}
          removeClippedSubviews={true}
          ListEmptyComponent={<Text style={styles.empty}>Nenhum produto encontrado.</Text>}
        />
      ) : (
        <FlatList
          data={produtosFiltrados}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          numColumns={colunas}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={colunas > 1 ? { columnGap: 12 } : undefined}
          showsVerticalScrollIndicator={false}
          // Performance tweaks
          initialNumToRender={16}
          windowSize={10}
          maxToRenderPerBatch={24}
          removeClippedSubviews={true}
          ListEmptyComponent={<Text style={styles.empty}>Nenhum produto encontrado.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9', paddingHorizontal: 16, paddingTop: 48 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 12, color: '#0F172A' },
  segment: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  segmentBtn: { flex: 1, paddingVertical: 8, borderRadius: 8, backgroundColor: '#E2E8F0', alignItems: 'center' },
  segmentBtnActive: { backgroundColor: '#2563EB' },
  segmentText: { color: '#0F172A', fontWeight: '600' },
  segmentTextActive: { color: '#fff' },
  input: {
    backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10,
    fontSize: 16, marginBottom: 10, borderWidth: 1, borderColor: '#E2E8F0', color: '#0F172A'
  },
  header: {
    fontSize: 18, fontWeight: '700', backgroundColor: '#E2E8F0', paddingVertical: 6, paddingHorizontal: 10,
    marginTop: 16, borderRadius: 6, color: '#0F172A'
  },
  listContent: { paddingBottom: 40 },
  card: {
    backgroundColor: '#FFFFFF', marginTop: 12, padding: 12, borderRadius: 12,
    shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 4, shadowOffset: { width: 0, height: 2 },
    elevation: 2, borderWidth: 1, borderColor: '#E2E8F0'
  },
  nome: { fontSize: 15, fontWeight: '600', color: '#0F172A' },
  preco: { marginTop: 4, color: '#2563EB', fontWeight: '700' },
  empty: { marginTop: 40, textAlign: 'center', color: '#475569', fontSize: 16 }
});
