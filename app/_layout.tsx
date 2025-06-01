import { ToastProvider } from "@/components/ui/toast-provider";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isFetchingUser } = useAuth();
  const router = useRouter();
  const segments = useSegments();
  const isNavigationReady = segments.length > 0;

  useEffect(() => {
    if (!isNavigationReady || isFetchingUser) return;

    const inAuthGroup = segments[0] === "auth" || segments[0] === "landing";

    if (!user && !inAuthGroup) {
      router.replace("/landing");
    } else if (user && inAuthGroup) {
      router.replace("/(tabs)/tasks");
    }
  }, [user, segments, isFetchingUser, isNavigationReady]);

  return <>{children}</>;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <RouteGuard>
          <ToastProvider>
            <Stack>
              <Stack.Screen
                name="landing"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="auth"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="(tabs)"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="add-task"
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="task-details/[id]"
                options={{
                  headerShown: false,
                }}
              />
            </Stack>
          </ToastProvider>
        </RouteGuard>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
