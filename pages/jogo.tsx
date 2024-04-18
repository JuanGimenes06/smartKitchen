import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons/'
import { useState } from 'react'


const alturaStatusBar = StatusBar.currentHeight



export default function Jogo() {

    const [load, defLoad] = useState(false);
    const [jogo, defJogo] = useState("");

    const [dif, defDif] = useState("");
    const [gen, defGen] = useState("");
    const [tema, defTema] = useState("");


    const KEY_GPT = 'sk-proj-U2sODdzSpen76SGlJKQRT3BlbkFJyz5HoSBnkdWGjyyoWuA0';

    async function gerarJogo() {
        if (dif === "" || gen === "" || tema === "" ) {
            Alert.alert("Atenção", "Falta informações", [{ text: "Beleza!" }])
            return;
        }
        defJogo("");
        defLoad(true);
        Keyboard.dismiss();

        const prompt = `Crie um ideia para uma fase de um jogo ${dif} que tem o foco em ${gen} e o sendo seu tema ${tema} `;

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
                defJogo(data.choices[0].message.content)
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

            <Text style={ESTILOS.header}>Criatividade para jogos</Text>

            <View style={ESTILOS.form}>

                <Text style={ESTILOS.label}>Contextualize</Text>

                <TextInput
                    placeholder="Dificuldade"
                    style={ESTILOS.input}
                    value={dif}
                    onChangeText={(texto) => defDif(texto)}
                />
                <TextInput
                    placeholder="Genero do jogo"
                    style={ESTILOS.input}
                    value={gen}
                    onChangeText={(texto) => defGen(texto)}
                />
                <TextInput
                    placeholder="Tema"
                    style={ESTILOS.input}
                    value={tema}
                    onChangeText={(texto) => defTema(texto)}
                />
                

            </View>

            <TouchableOpacity style={ESTILOS.button} onPress={gerarJogo}>
                <Text style={ESTILOS.buttonText}>Criar ideia</Text>
                <Ionicons name={'bulb-outline'} size={30} color={'#fff'} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={ESTILOS.containerScroll} showsVerticalScrollIndicator={false} >
                {load && (
                    <View style={ESTILOS.content}>
                        <Text style={ESTILOS.title}>Progamando o jogo...</Text>
                        <ActivityIndicator color="#000" size="large" />
                    </View>
                )}

                {jogo && (
                    <View style={ESTILOS.content}>
                        <Text style={{ lineHeight: 24 }}>{jogo} </Text>
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
        paddingTop: 20,
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
        backgroundColor: '#40804A',
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