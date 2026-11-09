import { useColorScheme } from "@/components/useColorScheme";
import { StudHubProvider, useStudHub } from "@/lib/studhub";
import { themeColors } from "@/lib/theme";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <StudHubProvider>
      <RootLayoutNav />
    </StudHubProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const colors = themeColors(colorScheme);
  const { ready, user } = useStudHub();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!ready) return;
    const top = segments[0];
    const inApp = top === "(app)" || top === "post";
    const onAuthScreen = top === "welcome" || top === "login" || top === "signup";
    if (!user && inApp) router.replace("/welcome");
    if (user && onAuthScreen) router.replace("/home");
  }, [ready, user, segments, router]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: "Log in", headerShown: false }} />
        <Stack.Screen name="signup" options={{ title: "Sign up", headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
        <Stack.Screen name="post/[id]" options={{ title: "Post" }} />
      </Stack>
      {!ready ? (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: colors.background,
          }}
        >
          <ActivityIndicator color={colors.coral} />
        </View>
      ) : null}
    </ThemeProvider>
  );
}
