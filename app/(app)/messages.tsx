import { Notice, useThemeColors } from "@/components/ui";
import { Text, View } from "react-native";

export default function MessagesScreen() {
  const colors = useThemeColors();

  return (
    <View style={{ flex: 1, padding: 20, gap: 14, justifyContent: "center" }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: "800" }}>Messages</Text>
      <Notice>
        Direct messages are not in this build. The old apps had a messages screen, but the rebuild starts with community posts and replies so a private inbox is not opened before moderation rules exist.
      </Notice>
    </View>
  );
}
