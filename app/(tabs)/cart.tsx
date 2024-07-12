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

              <Image source={require('@/assets/checkout.png')}/>
            <View style={{flex: 1, justifyContent: 'space-between'}}>
              <FlatList
                data={cart}
                renderItem={({ item }) => (
                  <View style={styles.cartItem}>
                    <View>
                      <ImageBackground src={item.image} style={{ width: 50, height: 70 }} resizeMode="contain" />
                      </View>
                    <View style={styles.cartContent}>
                      <Text style={{ fontSize: 16, fontWeight: '300'}}>{item.title}</Text>
                      <Text style={{color: '#dc8460', fontSize: 16}}>${item.price}</Text>
                      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                        <Image style={styles.removeButton} source={require('../../assets/remove.png')} />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
              />
              <View style={styles.footer}>
                <View style={styles.cartTotal}>
                  <Text style={{fontSize: 20}}>EST. TOTAL</Text>
                  <Text style={{fontSize: 25, color: '#dc8460'}}>
                    ${cart.reduce(((prev: number, item: ShopItem) => {
                      return item.price + prev
                    }), 0)}
                  </Text>
                </View>
                <View style={styles.checkoutContainer}>
                  <Icon size={28} name="gift" color='white' />
                  <Text style={{color: '#FFF', fontSize: 25}}>CHECKOUT</Text>
                </View>
              </View>
            </View>

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
    padding: 20,
  },
  cartItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1
  },
  cartContent: {
    display: 'flex',
    width: 300,
    gap: 5,
    paddingVertical: 10,
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
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  }
});

export default CartScreen;
