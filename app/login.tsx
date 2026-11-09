import { Button, Field, Notice, useThemeColors } from "@/components/ui";
import { useStudHub } from "@/lib/studhub";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const { signIn } = useStudHub();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit() {
    const nextError = signIn({ name, email });
    setError(nextError);
    if (!nextError) router.replace("/home");
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 24, gap: 16 }} keyboardShouldPersistTaps="handled">
          <Pressable accessibilityRole="button" onPress={() => router.back()}>
            <Text style={{ color: colors.coral, fontWeight: "700" }}>Back</Text>
          </Pressable>
          <Text style={{ color: colors.text, fontSize: 32, fontWeight: "800" }}>Log in</Text>
          <Notice>
            This build keeps your profile on this phone only. There is no server account yet, and no password is stored.
          </Notice>
          <Field label="Name" value={name} onChangeText={setName} autoCapitalize="words" placeholder="Amahle Dlamini" />
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoComplete="email"
            placeholder="you@student.ac.za"
          />
          {error ? <Text style={{ color: colors.danger }}>{error}</Text> : null}
          <Button label="Continue" onPress={submit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
