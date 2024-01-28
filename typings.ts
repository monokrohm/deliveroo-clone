export type Restaurant = {
    _id: string;
    image: string;
    name: string;
    rating: number;
    type: {name: string;};
    address: string;
    short_description: string;
    dishes: Dishes[];
    long: number;
    lat: number;
}

export type Dishes = {
    _id: string;
    image: string;
    name: string;
    short_description: string;
    price: number;
}

export type Featured = {
    _id: string;
    name: string;
    short_description: string;
}

export type Category = {
    _id: string;
    name: string;
    image: string;
}

export type RootStackParamList = {
    Home: undefined;
    Restaurant: Restaurant;
    Basket: undefined;
    PreparingOrder: undefined;
    Delivery: undefined;
};

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
}