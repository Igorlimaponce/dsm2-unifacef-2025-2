# Aula 07 - Listas avançadas e layout responsivo

## Objetivos
- Renderização eficiente com FlatList/SectionList.
- Memoização de componentes (React.memo / useCallback).
- Filtro por nome com TextInput.
- Layout responsivo com `useWindowDimensions`/`Dimensions` e Flexbox.

## O que foi implementado
- Alternância entre modos: `Por Categoria` (SectionList) e `Lista Otimizada` (FlatList) com renderização condicional.
- Campo de busca que filtra os produtos por nome.
- Cartões responsivos: largura do card é calculada conforme a largura da tela, distribuindo 1-4 colunas.
- Item de produto memoizado para evitar re-renderizações desnecessárias.
- Parâmetros de desempenho ajustados (`initialNumToRender`, `windowSize`, `maxToRenderPerBatch`).

## Executando
Dentro da pasta `Aula07`:
```bash
npm install
npm start
```
Abra com Expo Go ou em Web (para testes simples de layout).

## Dicas/Notas
- Para demonstrar FlatList, troque o SectionList por uma FlatList, mantendo o mesmo `renderItem`, `keyExtractor` e propriedades de performance.
- Em telas maiores, mais colunas são exibidas automaticamente.
- O dataset de exemplo é gerado dinamicamente e distribuído entre categorias.
