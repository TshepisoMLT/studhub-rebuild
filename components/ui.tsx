import { useColorScheme } from "@/components/useColorScheme";
import { themeColors, type ThemeColors } from "@/lib/theme";
import { ReactNode } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";

export function useThemeColors(): ThemeColors {
  const scheme = useColorScheme();
  return themeColors(scheme);
}

export function Field({
  label,
  ...props
}: TextInputProps & { label: string }) {
  const colors = useThemeColors();
  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.muted }]}>{label}</Text>
      <TextInput
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        {...props}
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.input,
            borderColor: colors.border,
          },
          props.style,
        ]}
      />
    </View>
  );
}

export function Button({
  label,
  onPress,
  variant = "primary",
}: {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
}) {
  const colors = useThemeColors();
  const primary = variant === "primary";
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: primary ? colors.coral : "transparent",
          borderColor: colors.coral,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text style={{ color: primary ? colors.onCoral : colors.coral, fontSize: 17, fontWeight: "700" }}>
        {label}
      </Text>
    </Pressable>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  const colors = useThemeColors();
  return (
    <View style={[styles.notice, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Text style={{ color: colors.muted, lineHeight: 20 }}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 8 },
  label: { fontSize: 13, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
  },
  button: {
    minHeight: 52,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  notice: {
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
  },
});
