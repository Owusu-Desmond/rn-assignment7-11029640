import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{
          headerShown: false,
          title: "Home",
        }
      }/>
      <Stack.Screen 
          name="products/[id]" 
          options={{
            title: "Product detail",
          }}
      />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
