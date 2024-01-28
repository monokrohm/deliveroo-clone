import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
import { Restaurant } from "../typings";

const RestaurantCard = ({
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
}: Restaurant) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        // Navigate to Restaurant key in Stack
        navigation.navigate("Restaurant", {
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
        });
      }}
      className="mr-3 bg-white boxShadow" // Shadow on Android NG
    >
      <Image
        source={{ uri: urlFor(image).url() }}
        className="h-36 w-64 rounded-sm"
      />

      <View className="px-3 pb-4">
        <Text className="pt-2 font-bold text-lg">{name}</Text>

        <View className="flex-row items-center space-x-1">
          <StarIcon color={"green"} opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> · {type.name}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <MapPinIcon color={"gray"} opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">Nearby · {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
