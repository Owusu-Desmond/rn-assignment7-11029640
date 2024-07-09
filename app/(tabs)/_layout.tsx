import { Tabs } from "expo-router";
import { Icon } from "@/components/Icon";

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: 'gray'  }}>
            <Tabs.Screen 
                name="index" 
                options={{
                    title: "Home",
                    tabBarIcon: ({color, focused}) => (
                        <Icon name={focused ? 'home' : 'home-outline'} size={28} color={color} />
                    )
                }} 
            />
            <Tabs.Screen 
                name="cart" 
                options={{
                    title: "Cart",
                    tabBarIcon: ({color, focused}) => (
                        <Icon name={focused ? 'cart' : 'cart-outline'} size={28} color={color} />
                    )
                }} 
            />
        </Tabs>
    )
}

export default TabsLayout;
