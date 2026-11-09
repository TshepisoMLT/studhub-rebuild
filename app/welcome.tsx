import { Button, useThemeColors } from "@/components/ui";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WelcomeScreen() {
  const colors = useThemeColors();
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View
        style={{
          backgroundColor: colors.coral,
          borderBottomLeftRadius: 32,
          borderBottomRightRadius: 32,
          minHeight: 280,
          alignItems: "center",
          justifyContent: "flex-end",
          padding: 28,
          paddingBottom: 36,
        }}
      >
        <Text style={{ color: colors.onCoral, fontSize: 42, fontWeight: "800" }}>StudHub</Text>
        <Text style={{ color: colors.onCoral, marginTop: 8, fontSize: 16 }}>For students, by students</Text>
      </View>
      <SafeAreaView edges={["bottom"]} style={{ flex: 1, padding: 24, justifyContent: "space-between" }}>
        <View style={{ gap: 10 }}>
          <Text style={{ color: colors.text, fontSize: 30, fontWeight: "800" }}>Welcome</Text>
          <Text style={{ color: colors.muted, fontSize: 17, lineHeight: 24 }}>
            Find people in your course, ask a question, and keep the answer where you can find it again.
          </Text>
        </View>
        <View style={{ gap: 12 }}>
          <Button label="Sign up" onPress={() => router.push("/signup")} />
          <Button label="Log in" variant="secondary" onPress={() => router.push("/login")} />
        </View>
      </SafeAreaView>
    </View>
  );
}
