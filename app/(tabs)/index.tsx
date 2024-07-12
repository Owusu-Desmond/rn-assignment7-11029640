import ShoppingCard from "@/components/ShoppingCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import SideNav from "@/components/sideNav";

export default function Index() {

  interface ShopItem {
    image: string,
    title: string,
    description: string,
    price: number,
    id: number
  }

  const [shop, setShop] = useState<ShopItem[]>([]);
  const [cart, setCart] = useState<ShopItem[]>([]);
  const [showSideNav, setShowSideNav] = useState<boolean>(false)

  useFocusEffect(
    useCallback(() => {
      fetchShop();
      fetchCart();
    }, [])
  );

  const fetchCart = async () => {
    try {
      const data = await AsyncStorage.getItem('cart');

      if (data !== null) {
        setCart(JSON.parse(data));
      } else {
        setCart([]);
      }
    } catch (err: any) {
      console.error('Error fetching cart:', err.message);
    }
  }

  const fetchShop = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      
      if (response.data !== null) {        
        setShop(response.data);
      }
    } catch (err: any) {
      console.error('Error fetching shop:', err.message);
    }
  }

  const addToCart = async (item: ShopItem) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (err: any) {
      console.error('Error adding from cart:', err.message);
    }
  }

  return (
    <SafeAreaView edges={['right', 'left', 'top']}>
      <ScrollView>
      {/* side Nav */}
      <SideNav visible={showSideNav} onClose={() => setShowSideNav(false)} />
        <View style={{backgroundColor: '#fff', paddingHorizontal: 20, paddingBottom: 100}}>
          {/* nav section */}
          <View style={styles.nav}>
            <TouchableOpacity onPress={() => setShowSideNav(true)}>
              <Image source={require('@/assets/Menu.png')} />
            </TouchableOpacity>
            <Image source={require('@/assets/Logo.png')} />
            <View style={[styles.iconsFlex, { gap: 30}]}>
              <Image source={require('@/assets/Search.png')} />
              <Image source={require('@/assets/shoppingBag.png')} />
            </View> 
          </View>

          {/* header section */}
          <FlatList
            data={shop}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={({ item }) => (
              <ShoppingCard
                image={item["image"]}
                title={item["title"]}
                description={(item.description).substring(0, 50)}
                price={item["price"]}
                onPress={() => addToCart(item)}
                inCart={cart.some(cartItem => cartItem.id === item["id"])}
                id={item['id']}
              />
            )}
            keyExtractor={item => item["id"].toString()}
          />
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
  iconsFlex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: {
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10
  },
  iconContainer: {
    backgroundColor: 'lightgray',
    borderRadius: 50,
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})