# To-Do App – README

## 1. Visão Geral
Este é um aplicativo de lista de tarefas desenvolvido em **React Native com Expo**, usando **Zustand** para gerenciamento de estado global e **react-native-mmkv** para persistência offline. O app permite:  

- Adicionar, editar e excluir tarefas.  
- Marcar tarefas como concluídas ou pendentes.  
- Filtrar tarefas por status (todas, pendentes, concluídas).  
- Menu de ações discreto com popover em cada tarefa.  

---

## 2. Decisões Técnicas

### 2.1 Gerenciamento de Estado
- **Biblioteca escolhida:** [Zustand](https://github.com/pmndrs/zustand)  
- **Justificativa:**  
  - Simples e leve para projetos pequenos/médios.  
  - Evita boilerplate do Redux, mantendo tipagem clara com TypeScript.  
  - Suporta middleware de persistência, facilitando a integração com MMKV.  

### 2.2 Persistência de Dados Offline
- **Biblioteca escolhida:** [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv)  
- **Justificativa:**  
  - Performance superior ao AsyncStorage.  
  - Fácil integração com Zustand via `zustand/middleware/persist`.  
  - Permite armazenamento seguro e rápido de objetos JSON (listas de tarefas).  

### 2.3 Navegação
- **Biblioteca escolhida:** [Expo Router](https://expo.github.io/router/)  
- **Justificativa:**  
  - Simples para estruturar múltiplas telas.  
  - Permite navegar para tela de adicionar/editar tarefas de forma clara.  

### 2.4 Geração de IDs
- **Biblioteca escolhida:** [expo-crypto + custom hook useId](https://docs.expo.dev/versions/latest/sdk/crypto/)  
- **Justificativa:**  
  - `uuid` tradicional não funciona com Hermes sem polyfills.  
  - `expo-crypto` garante geração segura de IDs únicos.  

### 2.5 UI / Componentes
- **Bibliotecas:** `NativeWind` (TailwindCSS para React Native), `Ionicons`  
- **Justificativa:**  
  - `NativeWind` facilita estilização rápida e consistente.  
  - Ícones do `Ionicons` melhoram a UX sem poluir o layout.

---

## 3. Como Rodar no Emulador

> ⚠️ **Atenção:** O `react-native-mmkv` exige execução em ambiente com código nativo. **Não funciona no Expo Go**. Você precisa rodar no **emulador** ou em um **dispositivo físico** com o cliente de desenvolvimento Expo (`npx expo run:android` ou `npx expo run:ios`).

### Passos:

1. **Instale as dependências do projeto**

```bash
npm install
# ou
yarn install
```

2. **Inicie o Metro bundler**

```bash
npx expo start
```

3. **Rodando no Android (emulador ou dispositivo físico)**

```bash
npx expo run:android
```

4. **Rodando no iOS (emulador ou dispositivo físico)**

```bash
npx expo run:ios
```

5. **Observações**

- Certifique-se de ter o emulador Android/iOS configurado corretamente.
- No primeiro build, o Expo vai compilar o código nativo necessário para o MMKV.