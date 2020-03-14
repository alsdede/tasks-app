import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

export default function TaskList({ data, handleDelete }) {
    return (
        <Animatable.View
            animation="fadeIn"
            duration={2000}
            useNativeDriver
            style={styles.container}
        >
            <View style={{ alignItems: "center" }}>
                <Text style={styles.textDate}>{data.date}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => handleDelete(data)}>
                    <Ionicons
                        name="ios-checkmark-circle"
                        size={35}
                        color="#1568"
                    />
                </TouchableOpacity>
                <View style={{}}>
                    <Text style={styles.text}>{data.task}</Text>
                </View>
            </View>
        </Animatable.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",

        margin: 8,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2
    },
    text: {
        color: "#000",
        fontSize: 18,
        paddingLeft: 10,
        paddingRight: 30
    },
    textDate: {
        flex: 1,
        color: "#156",
        fontSize: 14
    }
});
