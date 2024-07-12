import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Icon } from '@/components/Icon';

interface ShopItem {
  image: string;
  title: string;
  description: string;
  price: number;
  id: number;
}

const ProductPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<ShopItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get<ShopItem>(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err: any) {
        console.error('Error fetching product:', err.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);


  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['right', 'left']}>
      <View style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', gap: 20}}>
          <Icon name='add' size={28} color='#fff' />
          <Text style={styles.footerText}>Add to basket</Text>
        </TouchableOpacity>
        <Image source={require('@/assets/favourite.png')} style={{width: 50, height: 50}} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  productImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  price: {
    fontSize: 20,
    color: '#dc8460',
    marginVertical: 10,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    width: '100%',
    padding: 20,
  },
  footerText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ProductPage;
