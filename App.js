import React, { useState, useCallback, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    FlatList,
    Modal,
    TextInput,
    AsyncStorage
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { format, getDay } from "date-fns";
import TaskList from "./src/components/TaskList";

const AnimatableBtn = Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
    const [openFab, setOpenFab] = useState(false);
    const [input, setInput] = useState("");
    const [task, setTask] = useState([]);

    useEffect(() => {
        async function loadTasks() {
            const taskStorage = await AsyncStorage.getItem("@task");

            if (taskStorage) {
                setTask(JSON.parse(taskStorage));
            }
        }
        loadTasks();
    }, []);

    useEffect(() => {
        async function saveTasks() {
            await AsyncStorage.setItem("@task", JSON.stringify(task));
        }

        saveTasks();
    }, []);
    function handleAdd() {
        if (input === "") return;

        const data = {
            key: input,
            task: input,
            date: format(new Date(), "dd/MM/yyyy")
        };

        setTask([...task, data]);
        setOpenFab(false);
        setInput("");
    }

    const handleDelete = useCallback(data => {
        const filterTask = task.filter(r => r.key !== data.key);
        setTask(filterTask);
    });
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#000" barStyle="dark-content" />
            <View style={styles.content}>
                <Text style={styles.title}>Notas</Text>
            </View>
            {(task == null || task == "") && (
                <View style={styles.landView}>
                    <Text style={styles.textLand}>
                        {" "}
                        Clique em{" "}
                        <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                            +
                        </Text>
                    </Text>
                    <Text style={styles.textLand}>para adicionar uma Nota</Text>
                </View>
            )}
            {task != null && (
                <FlatList
                    marginHorizontal={10}
                    showsVerticalScrollIndicator={false}
                    data={task}
                    keyExtractor={item => String(item.key)}
                    renderItem={({ item }) => (
                        <TaskList data={item} handleDelete={handleDelete} />
                    )}
                />
            )}
            <Modal animationType="slide" transparent={false} visible={openFab}>
                <SafeAreaView style={styles.modal}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                            onPress={() => {
                                setOpenFab(false);
                            }}
                        >
                            <MaterialIcons
                                name="arrow-back"
                                size={30}
                                color="#1568"
                                style={{ marginHorizontal: 15 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerTitle}>
                        <Text style={styles.modalTitle}> Adicionar Tarefa</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <TextInput
                            multiline
                            autoCorrect={false}
                            style={styles.modalInput}
                            placeholder="Escreva sua anotação..."
                            value={input}
                            onChangeText={text => {
                                setInput(text);
                            }}
                        />
                        <TouchableOpacity
                            style={styles.btnAddNote}
                            onPress={handleAdd}
                        >
                            <Text style={styles.btnTextAddNote}>
                                Cadastrar Tarefa
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </Modal>
            <AnimatableBtn
                useNativeDriver
                animation="bounceInUp"
                duration={2000}
                style={styles.fab}
                onPress={() => setOpenFab(true)}
            >
                <Ionicons name="ios-add" size={35} color="#fff" />
            </AnimatableBtn>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f0f0f0"
    },
    content: {},
    title: {
        marginTop: 30,
        paddingBottom: 10,
        fontSize: 26,
        textAlign: "center",
        color: "#156"
    },
    fab: {
        position: "absolute",
        width: 60,
        height: 60,
        backgroundColor: "#1568",
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        right: 25,
        bottom: 25,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        zIndex: 999
    },
    modal: {
        flex: 1,
        backgroundColor: "#f0f0f0"
    },
    modalHeader: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    modalTitleHeader: {
        marginLeft: 10,
        fontSize: 18,
        color: "#156"
    },
    containerTitle: {
        alignItems: "center"
    },
    modalTitle: {
        marginTop: 20,
        fontSize: 20,
        color: "#156"
    },
    modalBody: {
        marginTop: 10
    },
    modalInput: {
        fontSize: 15,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 20,
        backgroundColor: "#FFF",
        padding: 3,
        height: 85,
        textAlignVertical: "top",
        color: "#000",
        borderRadius: 5
    },
    btnAddNote: {
        backgroundColor: "#156",
        marginTop: 10,
        marginHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        height: 40
    },
    btnTextAddNote: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#fff"
    },
    landView: {
        flex: 1,
        paddingHorizontal: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    textLand: {
        fontSize: 25,
        textAlignVertical: "center",
        color: "#156"
    }
});
