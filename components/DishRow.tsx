import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsId,
} from "../features/basketSlice";
import { RootState } from "../store";
import { Dishes } from "../typings";
import { useAppDispatch, useAppSelector } from "../reduxHooks";

const DishRow = ({ _id, name, short_description, price, image }: Dishes) => {
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useAppDispatch();
  const items = useAppSelector((state: RootState) =>
    selectBasketItemsId(state, _id)
  );

  const addItemToBasket = () => {
    dispatch(addToBasket({ _id, name, short_description, price, image }));
  };

  const removeItemFromBasket = () => {
    if (items.length == 0) return;

    dispatch(removeFromBasket({ _id, name, short_description, price, image }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`p-4 bg-white border border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="mb-1 text-lg">{name}</Text>
            {short_description ? (
              <Text className="text-gray-400">{short_description}</Text>
            ) : null}
            <Text className="mt-2 text-gray-400">${price.toFixed(2)}</Text>
          </View>

          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              style={{
                borderWidth: 1,
                borderColor: "#F3F3F3",
              }}
              className="p-4 h-20 w-20 bg-gray-300"
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className="px-4 bg-white">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity onPress={removeItemFromBasket}>
              <MinusCircleIcon
                color={items.length > 0 ? "#00CCBB" : "gray"}
                size={40}
              />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color={"#00CCBB"} size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
