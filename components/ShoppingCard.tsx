import { ComponentProps } from "react"
import { Image, ImageBackground, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { Icon } from "./Icon"

type ShoppingCardProps = {
    image: any,
    title: string,
    description: string,
    price: number,
    onPress: () => void,
    inCart: boolean
  }

  const ShoppingCard = ({ image, title, description, price, onPress, inCart }: ShoppingCardProps) => {
    
    return (
        <View style={styles.cardContainer}>
            <ImageBackground style={styles.imageContainer} resizeMode="contain" src={image}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={onPress}
                    disabled={inCart}
                >
                    <Icon color={inCart ? 'green' : 'black'} name={inCart ? 'checkmark-circle-outline' : 'add-circle-outline'} size={28} />
                </TouchableOpacity>
            </ImageBackground>
            <View style={{width: 155}}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
            
        </View>
    )
}

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
        resizeMode: 'contain'
    },
    addButton: {
        margin: 10
    },
    title: {
        fontSize: 13,
        fontWeight: '500'
    },
    description: {
        fontSize: 13,
        color: 'gray'
    },
    price: {
        fontSize: 20,
        fontWeight: '600',
        color: '#dc8460'
    },
})

export default ShoppingCard;