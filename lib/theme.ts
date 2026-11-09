export type Scheme = "light" | "dark";

export type ThemeColors = {
  background: string;
  card: string;
  text: string;
  muted: string;
  border: string;
  coral: string;
  onCoral: string;
  input: string;
  danger: string;
};

export function themeColors(scheme: Scheme): ThemeColors {
  if (scheme === "dark") {
    return {
      background: "#141110",
      card: "#241C1A",
      text: "#F7F3F0",
      muted: "#B7AAA4",
      border: "#3A2E2A",
      coral: "#FF6F61",
      onCoral: "#1A0E0C",
      input: "#2C2320",
      danger: "#FF8A80",
    };
  }

  return {
    background: "#FBF7F5",
    card: "#FFFFFF",
    text: "#1C1412",
    muted: "#6F625C",
    border: "#E7DCD7",
    coral: "#FF6F61",
    onCoral: "#1A0E0C",
    input: "#FFFFFF",
    danger: "#C62828",
  };
}
