import { Button, useThemeColors } from "@/components/ui";
import { formatWhen } from "@/lib/board-logic";
import { useStudHub } from "@/lib/studhub";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";

export default function PostScreen() {
  const colors = useThemeColors();
  const { board, addReply } = useStudHub();
  const params = useLocalSearchParams<{ id: string }>();
  const postId = Array.isArray(params.id) ? params.id[0] : params.id;
  const post = board.posts.find((item) => item.id === postId);
  const community = board.communities.find((item) => item.id === post?.communityId);
  const replies = board.replies.filter((reply) => reply.postId === postId);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);

  function send() {
    if (!postId) return;
    const nextError = addReply(postId, body);
    setError(nextError);
    if (!nextError) setBody("");
  }

  if (!post) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, padding: 20 }}>
        <Stack.Screen options={{ title: "Missing post" }} />
        <Text style={{ color: colors.text }}>That post is not on this phone.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }} contentContainerStyle={{ padding: 20, gap: 16 }}>
      <Stack.Screen options={{ title: community?.name ?? "Post" }} />
      <Text style={{ color: colors.coral, fontWeight: "700" }}>{community?.name}</Text>
      <Text style={{ color: colors.text, fontSize: 22, lineHeight: 30, fontWeight: "700" }}>{post.body}</Text>
      <Text style={{ color: colors.muted }}>
        {post.authorName} · {formatWhen(post.createdAt)}
      </Text>
      <Text style={{ color: colors.text, fontSize: 18, fontWeight: "800" }}>Replies</Text>
      {replies.length === 0 ? <Text style={{ color: colors.muted }}>No replies yet.</Text> : null}
      {replies.map((reply) => (
        <View
          key={reply.id}
          style={{ backgroundColor: colors.card, borderRadius: 16, padding: 14, gap: 6, borderWidth: 1, borderColor: colors.border }}
        >
          <Text style={{ color: colors.text, lineHeight: 22 }}>{reply.body}</Text>
          <Text style={{ color: colors.muted }}>
            {reply.authorName} · {formatWhen(reply.createdAt)}
          </Text>
        </View>
      ))}
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Write a reply"
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
      <Button label="Reply" onPress={send} />
    </ScrollView>
  );
}
