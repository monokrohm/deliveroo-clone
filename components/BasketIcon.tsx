import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAppSelector } from "../reduxHooks";
import { selectBasketItems, selectBasketTotal } from "../features/basketSlice";
import { useNavigation } from "@react-navigation/native";

const BasketIcon = () => {
  const items = useAppSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useAppSelector(selectBasketTotal);

  if (items.length === 0) return;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="flex-row items-center space-x-1 mx-5 p-4 rounded-lg bg-[#00CCBB]"
      >
        <Text className="py-1 px-2 text-white font-extrabold text-lg bg-[#01A296] rounded-md">
          {items.length}
        </Text>
        <Text className="flex-1 text-lg text-white font-extrabold text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          ${basketTotal.toFixed(2)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
