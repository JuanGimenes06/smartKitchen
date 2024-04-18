import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons/'
import { useState } from 'react';

const alturaStatusBar = StatusBar.currentHeight

export default function Licao() {

    const [load, defLoad] = useState(false)
    const [resultado, defResultado] = useState("")

    const [mat, defMat] = useState("")
    const [lc, defLc] = useState("")



    const KEY_GPT = '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';



    async function gerarResultado() {

        if (mat === "" || lc === "") {
            Alert.alert("Atenção", "Falta informações", [{ text: "Beleza!" }])
            return;
        }


        defResultado("");
        defLoad(true);
        Keyboard.dismiss();

        const prompt = `Ajude a fazer uma lição de casa de ${mat}. Resumindo, faça ${lc}`;

        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${KEY_GPT}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                temperature: 0.2,
                max_tokens: 500,
                top_p: 1,
            })
        })

            .then(response => response.json())
            .then((data) => {
                console.log(data.choices[0].message.content);
                defResultado(data.choices[0].message.content)
            })
            .catch((error) => {
                Alert.alert("Eita", "Probleminha no gpt", [{ text: 'joia' }])
            })
            .finally(() => {
                defLoad(false);
            })

    }


    return (
        <View style={ESTILOS.container}>
            <Text style={ESTILOS.header}>Lição de Casa</Text>
            <View style={ESTILOS.form}>
                <Text style={ESTILOS.label}>Quer ajuda?</Text>
                <TextInput
                    placeholder="Materia"
                    style={ESTILOS.input}
                    value={mat}
                    onChangeText={(texto) => defMat(texto)}
                />
                <TextInput
                    placeholder="O que tem que fazer?"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    style={ESTILOS.input}
                    value={lc}
                    onChangeText={(texto) => defLc(texto)}
                />

            </View>
            <TouchableOpacity style={ESTILOS.button} onPress={gerarResultado}>
                <Text style={ESTILOS.buttonText}>Escrever</Text>
                <Ionicons name="reader-outline" size={24} color="#fff" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={ESTILOS.containerScroll} showsVerticalScrollIndicator={false} >
                {load && (
                    <View style={ESTILOS.content}>
                        <Text style={ESTILOS.title}>Fazendo...</Text>
                        <ActivityIndicator color="#000" size="large" />
                    </View>
                )}

                {resultado && (
                    <View style={ESTILOS.content}>
                        <Text style={{ lineHeight: 24 }}>{resultado} </Text>
                    </View>
                )}
            </ScrollView>

        </View>
    );
}

const ESTILOS = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'column',
        paddingTop: 20,
        marginBottom: 50,
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        paddingTop: Platform.OS === 'android' ? alturaStatusBar : 54
    },
    form: {
        backgroundColor: '#FFF',
        width: '90%',
        borderRadius: 8,
        padding: 16,
        marginTop: 16,
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#94a3b8',
        padding: 8,
        fontSize: 16,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#454080',
        width: '90%',
        borderRadius: 8,
        flexDirection: 'row',
        padding: 14,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
        fontWeight: 'bold'
    },
    content: {
        backgroundColor: '#FFF',
        padding: 16,
        width: '100%',
        marginTop: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 14
    },
    containerScroll: {
        width: '90%',
        marginTop: 8,
    }

})