import { Stack } from "expo-router";
import "../../global.css";

export default function RootLayout() {
  return (
    // Layout raiz da aplicação usando Stack do Expo Router
    // Configuramos opções globais da stack: escondemos o header nativo e deixamos a status bar com estilo escuro
    <Stack screenOptions={{
      headerShown: false,
      statusBarStyle: 'dark'
    }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
