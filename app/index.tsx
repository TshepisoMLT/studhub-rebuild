import { useThemeColors } from "@/components/ui";
import { useStudHub } from "@/lib/studhub";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
  const colors = useThemeColors();
  const { ready, user } = useStudHub();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    router.replace(user ? "/home" : "/welcome");
  }, [ready, router, user]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background, alignItems: "center", justifyContent: "center", gap: 12 }}>
      <Text style={{ color: colors.coral, fontSize: 32, fontWeight: "800" }}>StudHub</Text>
      <ActivityIndicator color={colors.coral} />
    </View>
  );
}
