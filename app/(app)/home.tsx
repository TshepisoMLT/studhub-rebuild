import { Button, Notice, useThemeColors } from "@/components/ui";
import { formatWhen } from "@/lib/board-logic";
import { useStudHub } from "@/lib/studhub";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function HomeScreen() {
  const colors = useThemeColors();
  const router = useRouter();
  const { user, board, addPost } = useStudHub();
  const [scope, setScope] = useState<"all" | "mine">("all");
  const [communityId, setCommunityId] = useState(
    () => board.communities.find((community) => community.joined)?.id ?? board.communities[0]?.id ?? "",
  );
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  const joined = board.communities.filter((community) => community.joined);
  const visiblePosts = useMemo(() => {
    const ids = new Set(joined.map((community) => community.id));
    return board.posts.filter((post) => (scope === "all" ? true : ids.has(post.communityId)));
  }, [board.posts, joined, scope]);

  function publish() {
    const nextError = addPost(communityId, body);
    setError(nextError);
    if (!nextError) setBody("");
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 32 }}>
      <Text style={{ color: colors.text, fontSize: 28, fontWeight: "800" }}>
        {user ? `Hi, ${user.name.split(" ")[0]}` : "Home"}
      </Text>
      <Notice>Sample posts ship with the app. Anything you add is saved on this phone, not on a server.</Notice>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <ScopeChip label="Discover" active={scope === "all"} onPress={() => setScope("all")} />
        <ScopeChip label="Joined" active={scope === "mine"} onPress={() => setScope("mine")} />
      </View>

      <View style={{ backgroundColor: colors.card, borderRadius: 18, padding: 14, gap: 12, borderWidth: 1, borderColor: colors.border }}>
        <Text style={{ color: colors.text, fontWeight: "700" }}>Ask something</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {board.communities.map((community) => {
            const selected = community.id === communityId;
            return (
              <Pressable
                key={community.id}
                accessibilityRole="button"
                onPress={() => setCommunityId(community.id)}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 999,
                  backgroundColor: selected ? colors.coral : colors.background,
                  borderWidth: 1,
                  borderColor: selected ? colors.coral : colors.border,
                }}
              >
                <Text style={{ color: selected ? colors.onCoral : colors.text, fontWeight: "700" }}>{community.name}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
        <TextInput
          value={body}
          onChangeText={setBody}
          placeholder="What do you need help with?"
          placeholderTextColor={colors.muted}
          multiline
          style={{
            minHeight: 88,
            color: colors.text,
            backgroundColor: colors.input,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: 14,
            padding: 12,
            textAlignVertical: "top",
          }}
        />
        {error ? <Text style={{ color: colors.danger }}>{error}</Text> : null}
        <Button label="Post" onPress={publish} />
      </View>

      {visiblePosts.length === 0 ? (
        <Text style={{ color: colors.muted }}>Nothing here yet. Join a community or switch to Discover.</Text>
      ) : (
        visiblePosts.map((post) => {
          const community = board.communities.find((item) => item.id === post.communityId);
          const replyCount = board.replies.filter((reply) => reply.postId === post.id).length;
          return (
            <Pressable
              key={post.id}
              accessibilityRole="button"
              onPress={() => router.push(`/post/${post.id}`)}
              style={{
                backgroundColor: colors.card,
                borderRadius: 18,
                padding: 16,
                gap: 8,
                borderWidth: 1,
                borderColor: colors.border,
              }}
            >
              <Text style={{ color: colors.coral, fontWeight: "700" }}>{community?.name ?? "Community"}</Text>
              <Text style={{ color: colors.text, fontSize: 16, lineHeight: 22 }}>{post.body}</Text>
              <Text style={{ color: colors.muted }}>
                {post.authorName} · {formatWhen(post.createdAt)} · {replyCount} {replyCount === 1 ? "reply" : "replies"}
              </Text>
            </Pressable>
          );
        })
      )}
    </ScrollView>
  );
}

function ScopeChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  const colors = useThemeColors();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 999,
        backgroundColor: active ? colors.coral : colors.card,
        borderWidth: 1,
        borderColor: active ? colors.coral : colors.border,
      }}
    >
      <Text style={{ color: active ? colors.onCoral : colors.text, fontWeight: "700" }}>{label}</Text>
    </Pressable>
  );
}
