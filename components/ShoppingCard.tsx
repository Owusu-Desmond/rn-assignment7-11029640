import { ComponentProps } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "./Icon";
import { Link } from "expo-router";

type ShoppingCardProps = {
  image: string;
  title: string;
  description: string;
  price: number;
  onPress: () => void;
  inCart: boolean;
  id: number;
};

const ShoppingCard = ({ image, title, description, price, onPress, inCart, id }: ShoppingCardProps) => {
  return (
    <View style={styles.cardContainer}>
      <Link href={`/products/${id}`}>
        <ImageBackground 
            style={styles.imageContainer} 
            resizeMode="contain" 
            source={{ uri: image }}
        >
            <TouchableOpacity 
                style={styles.addButton} 
                onPress={onPress} 
                disabled={inCart}
            >
                <Icon 
                    color={inCart ? 'green' : '#dc8460'} 
                    name={inCart ? 'checkmark-circle-outline' : 'add-circle-outline'} 
                    size={28} 
                />
            </TouchableOpacity>
        </ImageBackground>
      </Link>
      <View style={{ width: 155 }}>
        <Link href={`/products/${id}`}>
            <Text style={styles.title}>{title}</Text>
        </Link>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.price}>${price}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 30,
    display: 'flex',
    gap: 3,
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 155,
    height: 200,
    resizeMode: 'contain',
  },
  addButton: {
    margin: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '500',
  },
  description: {
    fontSize: 13,
    color: 'gray',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#dc8460',
  },
});

export default ShoppingCard;
