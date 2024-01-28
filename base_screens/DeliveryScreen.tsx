import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../reduxHooks";
import { selectRestaurant } from "../features/restaurantSlice";
import { XMarkIcon } from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import { resetBasket } from "../features/basketSlice";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useAppSelector(selectRestaurant);
  const dispatch = useAppDispatch();

  return (
    <View className="flex-1 bg-[#00CCBB]">
      <SafeAreaView className="mt-5 z-50">
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity
            onPress={() => {
              dispatch(resetBasket());
              navigation.navigate("Home");
            }}
          >
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Order Help</Text>
        </View>

        <View className="mx-5 my-2 p-6 rounded-md bg-white shadow-md z-50">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Delivery</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>

            <Image
              source={require("../assets/bike2.gif")}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar color="#00CCBB" indeterminate={true} />

          <Text className="mt-3 text-xs text-gray-500">
            Your order from {restaurant.name} is being prepared
          </Text>
        </View>
      </SafeAreaView>

      {/* Maps do not work on web */}
      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-10"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.name}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        ></Marker>
      </MapView>

      <SafeAreaView className="flex-row items-center space-x-5 h-28 bg-white">
        <Image
          source={{
            uri: "https://images.prismic.io/dbhq-deliveroo-riders-website/ed825791-0ba4-452c-b2cb-b5381067aad3_RW_hk_kit_importance.png?auto=compress,format&rect=0,0,1753,1816&w=1400&h=1450",
          }}
          className="ml-5 p-4 h-12 w-12 rounded-full bg-gray-300"
        />

        <View className="flex-1">
          <Text className="text-lg">Raymond Fung</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <Text className="mr-5 font-bold text-lg text-[#00CCBB]">Call</Text>
      </SafeAreaView>
    </View>
  );
};

export default DeliveryScreen;
