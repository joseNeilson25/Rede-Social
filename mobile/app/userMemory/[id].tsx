import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function userMemory(){
    const  { id} = useLocalSearchParams();
    return (
        <View>
            <Text>memoria de id: {id}</Text>
        </View> 
    )
}