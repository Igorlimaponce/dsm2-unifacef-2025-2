# Aula 08 - Câmera e Galeria com Expo

## Objetivos
- Solicitar permissões para uso da câmera e da galeria.
- Capturar imagens diretamente da câmera usando `expo-image-picker`.
- Selecionar imagens da galeria do dispositivo.
- Exibir a imagem capturada/selecionada na interface.

## Dependências principais
- `expo`
- `react`
- `react-native`
- `expo-image-picker`
- `expo-status-bar`

## Instalação
Dentro da pasta `Aula08`:

```bash
npm install
```

## Executando
Para iniciar o projeto no Expo (modo padrão):
```bash
npm start
```
Depois escolha no menu do Expo:
- Pressione `w` para abrir no web (limitado para câmera)
- Escaneie o QR Code com o aplicativo **Expo Go** para testar no dispositivo físico.

## Uso da Câmera e Galeria
O arquivo `App.js` contém:
- Solicitação de permissões com hooks `useCameraPermissions` e `useMediaLibraryPermissions`.
- Funções `abrirCamera()` e `abrirGaleria()` que atualizam o estado `avatarUri`.
- Exibição de um avatar padrão (`./assets/avatar.png`) substituído pela foto escolhida.

## Atividade Prática
Crie/Modifique para uma tela de perfil onde:
1. Um avatar genérico é exibido inicialmente.
2. O usuário pode tirar uma foto ou escolher da galeria.
3. A foto escolhida substitui o avatar.
4. Botão opcional para remover a foto e voltar ao avatar padrão.

### Estilo de avatar sugerido
```js
avatar: {
  width: 150,
  height: 150,
  borderRadius: 75,
}
```

## Observações
- No Android pode ser necessário aceitar permissões manualmente.
- No iOS, a primeira solicitação aparece automaticamente.
- Em ambiente web, a experiência de câmera pode ser limitada ou indisponível.

## Próximos Passos (Sugestões)
- Salvar avatar escolhido em AsyncStorage para persistir.
- Adicionar botão para cortar ou aplicar filtros simples.
- Subir a imagem para um backend (upload).
