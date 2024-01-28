import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Category } from "../typings";

const CategoryCard = ({ image, name }: Category) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image
        source={{
          uri: image,
        }}
        className="h-20 w-20 rounded"
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
