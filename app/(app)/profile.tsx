import { Button, useThemeColors } from "@/components/ui";
import { useStudHub } from "@/lib/studhub";
import { useRouter } from "expo-router";
import { Text, View } from "react-native";

export default function ProfileScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const { user, signOut } = useStudHub();
  const initial = user?.name.trim().charAt(0).toUpperCase() || "?";

  return (
    <View style={{ flex: 1, padding: 20, gap: 16 }}>
      <View
        style={{
          width: 84,
          height: 84,
          borderRadius: 42,
          backgroundColor: colors.coral,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: colors.onCoral, fontSize: 34, fontWeight: "800" }}>{initial}</Text>
      </View>
      <View style={{ gap: 4 }}>
        <Text style={{ color: colors.text, fontSize: 28, fontWeight: "800" }}>{user?.name ?? "Guest"}</Text>
        <Text style={{ color: colors.muted }}>{user?.email}</Text>
        <Text style={{ color: colors.muted }}>{user?.course}</Text>
      </View>
      <Text style={{ color: colors.muted, lineHeight: 20 }}>
        This profile is local. Signing out clears it from the phone. Posts already saved here stay on the device.
      </Text>
      <Button
        label="Sign out"
        variant="secondary"
        onPress={() => {
          signOut();
          router.replace("/welcome");
        }}
      />
    </View>
  );
}
