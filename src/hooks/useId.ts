import * as Crypto from "expo-crypto";

// Hook simples que gera um UUID usando a API Crypto do Expo
// Pode ser usado para criar IDs únicos para novas tarefas
export const useId = () => {
  return Crypto.randomUUID();
};