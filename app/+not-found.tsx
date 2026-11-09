import { useThemeColors } from "@/components/ui";
import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  const colors = useThemeColors();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center", padding: 24, gap: 12 }}>
      <Stack.Screen options={{ title: "Not found" }} />
      <Text style={{ color: colors.text, fontSize: 22, fontWeight: "800" }}>That screen is not in this build.</Text>
      <Link href="/welcome">
        <Text style={{ color: colors.coral, fontWeight: "700" }}>Back to StudHub</Text>
      </Link>
    </View>
  );
}
