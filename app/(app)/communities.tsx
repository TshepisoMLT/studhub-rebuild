import { useThemeColors } from "@/components/ui";
import { useStudHub } from "@/lib/studhub";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function CommunitiesScreen() {
  const colors = useThemeColors();
  const { board, toggleJoin } = useStudHub();

  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 14, paddingBottom: 32 }}>
      <Text style={{ color: colors.muted, lineHeight: 20 }}>
        Communities stand in for a course or study topic. Joining is stored on this phone.
      </Text>
      {board.communities.map((community) => (
        <View
          key={community.id}
          style={{
            backgroundColor: colors.card,
            borderRadius: 18,
            padding: 16,
            gap: 8,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ color: colors.coral, fontWeight: "700" }}>{community.course}</Text>
          <Text style={{ color: colors.text, fontSize: 22, fontWeight: "800" }}>{community.name}</Text>
          <Text style={{ color: colors.muted, lineHeight: 20 }}>{community.blurb}</Text>
          <Text style={{ color: colors.muted }}>{community.members} students</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => toggleJoin(community.id)}
            style={{
              alignSelf: "flex-start",
              marginTop: 6,
              minHeight: 44,
              paddingHorizontal: 16,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: community.joined ? "transparent" : colors.coral,
              borderWidth: 2,
              borderColor: colors.coral,
            }}
          >
            <Text style={{ color: community.joined ? colors.coral : colors.onCoral, fontWeight: "700" }}>
              {community.joined ? "Leave" : "Join"}
            </Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}
