import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { urlFor } from "../sanity";
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
} from "react-native-heroicons/solid";
import { QuestionMarkCircleIcon } from "react-native-heroicons/outline";
import DishRow from "../components/DishRow";
import { Dishes, RootStackParamList } from "../typings";
import BasketIcon from "../components/BasketIcon";
import { useAppDispatch } from "../reduxHooks";
import { setRestaurant } from "../features/restaurantSlice";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const {
    params: {
      _id,
      image,
      name,
      rating,
      type,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute<RouteProp<RootStackParamList, "Restaurant">>();

  useEffect(() => {
    dispatch(
      setRestaurant({
        _id,
        image,
        name,
        rating,
        type,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  return (
    <>
      <BasketIcon />

      <ScrollView>
        <View className="relative">
          <Image
            source={{ uri: urlFor(image).url() }}
            className="p-4 w-full h-56 bg-gray-300"
          />

          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-8 left-3 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color={"#00CCBB"} />
          </TouchableOpacity>
        </View>

        <View className="bg-white">
          <View className="px-4 pt-4">
            <Text className="text-xl font-bold">{name}</Text>

            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center">
                <StarIcon color={"green"} opacity={0.5} size={22} />
                <Text className="text-xs text-gray-500">
                  <Text className="text-green-500">{rating}</Text> · {type.name}
                </Text>
              </View>

              <View className="flex-row items-center">
                <MapPinIcon color={"gray"} opacity={0.4} size={22} />
                <Text className="text-xs text-gray-500">
                  Nearby · {address}
                </Text>
              </View>
            </View>

            <Text className="mt-2 pb-4 text-gray-500">{short_description}</Text>
          </View>

          <TouchableOpacity className="flex-row items-center space-x-2 p-3 border-y border-gray-300">
            <QuestionMarkCircleIcon color={"gray"} opacity={0.6} size={20} />
            <Text className="flex-1 pl-2 text-md font-bold">
              Have a food allergy?
            </Text>
            <ChevronRightIcon color={"#00CCBB"} />
          </TouchableOpacity>
        </View>

        <View className="pb-36">
          <Text className="mb-3 px-5 pt-6 font-bold text-xl">Menu</Text>

          {dishes.map((dish: Dishes) => (
            <DishRow
              key={dish._id}
              _id={dish._id}
              name={dish.name}
              short_description={dish.short_description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
