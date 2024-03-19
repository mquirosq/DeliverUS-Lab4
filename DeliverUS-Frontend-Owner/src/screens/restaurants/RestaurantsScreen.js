/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { StyleSheet, View, FlatList, Pressable } from 'react-native'
import TextRegular from '../../components/TextRegular'
import { getAll } from '../../api/RestaurantEndpoints'
import * as GlobalStyles from '../../styles/GlobalStyles'
import TextSemiBold from '../../components/TextSemiBold'
import ImageCard from '../../components/ImageCard'

export default function RestaurantsScreen ({ navigation }) {
  const [restaurants, setRestaurants] = useState([])
  useEffect(() => {
    console.log('Loading restaurants, please wait 2 seconds')
    setTimeout(() => {
      setRestaurants(getAll) // getAll function has to be imported
      console.log('Restaurants loaded')
    }, 2000)
  }, [])

  const renderRestaurant = ({ item }) => {
    return (
    <Pressable
      style={styles.row}
      onPress={() => {
        navigation.navigate('RestaurantDetailScreen', { id: item.id })
      }}>
        <TextRegular>
            {item.name}
        </TextRegular>
    </Pressable>
    )
  }
  const renderRestaurantWithImageCard = ({ item }) => {
    return (
      <ImageCard
        imageUri={item.logo ? { uri: process.env.API_BASE_URL + '/' + item.logo } : undefined}
        title={item.name}
        onPress={() => {
          navigation.navigate('RestaurantDetailScreen', { id: item.id })
        }}>
          <TextRegular numberOfLines={2}>{item.description}</TextRegular>
          {item.averageServiceMinutes !== null &&
            <TextSemiBold>Avg. service time: <TextSemiBold textStyle={{ color: GlobalStyles.brandPrimary }}>{item.averageServiceMinutes} min.</TextSemiBold></TextSemiBold>
          }
          <TextSemiBold>Shipping: <TextSemiBold textStyle={{ color: GlobalStyles.brandPrimary }}>{item.shippingCosts.toFixed(2)}€</TextSemiBold></TextSemiBold>
      </ImageCard>
    )
  }
  return (
    <FlatList
      style={styles.container}
      data={restaurants}
      renderItem={renderRestaurantWithImageCard}
      keyExtractor={item => item.id.toString()}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  actionButton: {
    borderRadius: 8,
    height: 40,
    marginTop: 12,
    margin: '1%',
    padding: 10,
    alignSelf: 'center',
    flexDirection: 'column',
    width: '50%'
  },
  row: {
    padding: 15,
    marginBottom: 5,
    backgroundColor: GlobalStyles.brandBlue
  },
  text: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
    marginLeft: 5
  }
})
