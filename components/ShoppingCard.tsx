import { ComponentProps } from "react"
import { Image, ImageBackground, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from "react-native"
import { Icon } from "./Icon"

type ShoppingCardProps = {
    imageUrl: any,
    name: string,
    desc: string,
    price: number,
    onPress: () => void,
    inCart: boolean
  }

  const ShoppingCard = ({ imageUrl, name, desc, price, onPress, inCart }: ShoppingCardProps) => {
    return (
        <View style={styles.cardContainer}>
            <ImageBackground style={styles.imageContainer} source={imageUrl}>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={onPress}
                    disabled={inCart}
                >
                    <Icon color={inCart ? 'green' : 'black'} name={inCart ? 'checkmark-circle-outline' : 'add-circle-outline'} size={28} />
                </TouchableOpacity>
            </ImageBackground>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.desc}>{desc}</Text>
            <Text style={styles.price}>${price}</Text>
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
    },
    addButton: {
        margin: 10
    },
    name: {
        fontSize: 18,
        fontWeight: '400'
    },
    desc: {
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