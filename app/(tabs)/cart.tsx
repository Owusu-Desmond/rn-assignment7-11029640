import { Icon } from "@/components/Icon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CartScreen = () => {

  interface ShopItem {
      image: string,
      name: string,
      description: string,
      price: number,
      id: number
    }

  const [cart, setCart] = useState<ShopItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      console.log('Hello, I am focused!');
      fetchCart();
    }, [])
  );


  console.log(cart);
  

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
    <SafeAreaView>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.nav}>
              <View />
              <Image source={require('@/assets/Logo.png')} />
              <View style={{ gap: 30}}>
                <Image source={require('@/assets/Search.png')} />
              </View> 
              </View>
              <Text style={{fontSize: 25, textAlign: 'center', paddingVertical: 20}}>Checkout</Text>
            <FlatList
              data={cart}
              renderItem={({ item }) => (
                <View style={styles.cartItem}>
                  <Image source={require(item.image)} style={{ width: 100, height: 150 }} />
                  <View style={styles.cartContent}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                    <Text style={{fontSize: 18}}>{item.description}</Text>
                    <Text style={{color: '#dc8460', fontSize: 20}}>${item.price}</Text>
                    <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                      <Image style={styles.removeButton} source={require('../../assets/remove.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              keyExtractor={item => item.id.toString()}
            />

            <View style={styles.cartTotal}>
              <Text style={{fontSize: 20}}>EST. TOTAL</Text>
              <Text style={{fontSize: 25, color: '#dc8460'}}>
                ${cart.reduce(((prev: number, item: ShopItem) => {
                  return item.price + prev
                }), 0)}
              </Text>
            </View>
        </View>
        <View style={styles.checkoutContainer}>
          <Icon size={28} name="gift" color='white' />
          <Text style={{color: '#FFF', fontSize: 25}}>CHECKOUT</Text>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  nav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 10,
    paddingVertical: 10,
  },
  cartContent: {
    display: 'flex',
    gap: 7
  },
  removeButton: {
    display: 'flex',
    alignSelf: 'flex-end',
    marginRight: 20
  },
  cartTotal: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  checkoutContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#000',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CartScreen;
