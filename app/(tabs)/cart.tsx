import { Icon } from "@/components/Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = () => {

  interface ShopItem {
    image: string,
    title: string,
    description: string,
    price: number,
    id: number
  }

  const [cart, setCart] = useState<ShopItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  const fetchCart = async () => {
    try {
      const data = await AsyncStorage.getItem('cart');
      if (data !== null) {
        setCart(JSON.parse(data));
      }
    } catch (err: any) {
      console.error('Error fetching cart:', err.message);
    }
  }

  const removeFromCart = async (id: number) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (err: any) {
      console.error('Error removing from cart:', err.message);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left', 'top']}>
      <View style={styles.container}>
        <View style={styles.nav}>
          <View />
          <Image source={require('@/assets/Logo.png')} />
          <Image source={require('@/assets/Search.png')} />
        </View>
        <Image 
          style={{width: 250, height: 100, alignSelf: 'center'}} 
          resizeMode="contain" 
          source={require('@/assets/checkout.png')}
        />
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <View>
                  <ImageBackground src={item.image} style={{ width: 70, height: 100 }} resizeMode="contain" />
                </View>
                <View style={styles.cartContent}>
                  <Text style={{ fontSize: 16, fontWeight: '300', maxWidth: 270 }}>{item.title}</Text>
                  <Text style={{ color: '#dc8460', fontSize: 16 }}>${item.price}</Text>
                  <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Image style={styles.removeButton} source={require('../../assets/remove.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
            style={{paddingHorizontal: 20}}
          />
          <View style={styles.footer}>
            <View style={styles.cartTotal}>
              <Text style={{ fontSize: 20 }}>EST. TOTAL</Text>
              <Text style={{ fontSize: 25, color: '#dc8460'}}>
                ${cart.reduce(((prev: number, item: ShopItem) => {
                  return item.price + prev
                }), 0).toFixed(2)}
              </Text>
            </View>
            <View style={styles.checkoutContainer}>
              <Icon size={28} name="gift" color='white' />
              <Text style={{ color: '#FFF', fontSize: 25 }}>CHECKOUT</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomColor: 'gray',
  },
  cartContent: {
    width: 300,
    gap: 5,
    paddingVertical: 10,
  },
  removeButton: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  cartTotal: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkoutContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#000',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default CartScreen;
