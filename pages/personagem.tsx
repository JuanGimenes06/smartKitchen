import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons/'
import { useState } from 'react'


const alturaStatusBar = StatusBar.currentHeight



export default function Personagem() {

    const [load, defLoad] = useState(false);
    const [historia, defHistoria] = useState("");

    const [raca, defRaca] = useState("");
    const [prof, defProf] = useState("");
    const [idade, defIdade] = useState("");
    const [contexto, defContexto] = useState("");
    const [nome, defNome] = useState("")

    const KEY_GPT = 'sk-proj-U2sODdzSpen76SGlJKQRT3BlbkFJyz5HoSBnkdWGjyyoWuA0';

    async function gerarHistoria() {
        if (raca === "" || prof === "" || idade === "" || contexto === "" || nome === '') {
            Alert.alert("Atenção", "Falta informações", [{ text: "Beleza!" }])
            return;
        }
        defHistoria("");
        defLoad(true);
        Keyboard.dismiss();

        const prompt = `Crie a história de um personagem chamado ${nome}, da raça ${raca} com ${idade} anos de idade que trabalha como ${prof}. Não esqueça de inserir de acordo com o contexto do mundo que é ${contexto}`;

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
                defHistoria(data.choices[0].message.content)
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

            <Text style={ESTILOS.header}>Crição de histórias</Text>

            <View style={ESTILOS.form}>

                <Text style={ESTILOS.label}>Como ele é ?</Text>

                <TextInput
                    placeholder="Nome"
                    style={ESTILOS.input}
                    value={nome}
                    onChangeText={(texto) => defNome(texto)}
                />
                <TextInput
                    placeholder="Raça"
                    style={ESTILOS.input}
                    value={raca}
                    onChangeText={(texto) => defRaca(texto)}
                />
                <TextInput
                    placeholder="Profissão"
                    style={ESTILOS.input}
                    value={prof}
                    onChangeText={(texto) => defProf(texto)}
                />
                <TextInput
                    placeholder="Idade"
                    style={ESTILOS.input}
                    value={idade}
                    onChangeText={(texto) => defIdade(texto)}
                />
                <TextInput
                    placeholder="Contexto que esta inserido"
                    style={ESTILOS.input}
                    value={contexto}
                    onChangeText={(texto) => defContexto(texto)}
                />

            </View>

            <TouchableOpacity style={ESTILOS.button} onPress={gerarHistoria}>
                <Text style={ESTILOS.buttonText}>Criar história</Text>
                <Ionicons name={'clipboard-outline'} size={30} color={'#fff'} />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={ESTILOS.containerScroll} showsVerticalScrollIndicator={false} >
                {load && (
                    <View style={ESTILOS.content}>
                        <Text style={ESTILOS.title}>Escrevendo historia...</Text>
                        <ActivityIndicator color="#000" size="large" />
                    </View>
                )}

                {historia && (
                    <View style={ESTILOS.content}>
                        <Text style={{ lineHeight: 24 }}>{historia} </Text>
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
        backgroundColor: '#7539AA',
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