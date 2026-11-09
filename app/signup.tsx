import { Button, Field, Notice, useThemeColors } from "@/components/ui";
import { useStudHub } from "@/lib/studhub";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignupScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const { signUp } = useStudHub();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit() {
    const nextError = signUp({ name, email, course });
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
          <Text style={{ color: colors.text, fontSize: 32, fontWeight: "800" }}>Create a profile</Text>
          <Notice>Your name, email, and course stay in this app's storage on the phone. They are not uploaded.</Notice>
          <Field label="Name" value={name} onChangeText={setName} autoCapitalize="words" placeholder="Amahle Dlamini" />
          <Field
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoComplete="email"
            placeholder="you@student.ac.za"
          />
          <Field label="Course or topic" value={course} onChangeText={setCourse} autoCapitalize="words" placeholder="COS301" />
          {error ? <Text style={{ color: colors.danger }}>{error}</Text> : null}
          <Button label="Continue" onPress={submit} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
