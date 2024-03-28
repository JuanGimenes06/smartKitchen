import { StyleSheet, Text, View, TextInput, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const alturaStatusBar = StatusBar.currentHeight

export default function App() {

    return (
        <View style={ESTILOS.container}>
            <StatusBar barStyle="light-content" translucent={true} backgroundColor="#5656ff" />
            <Text style={ESTILOS.header}>Calculo de volume</Text>
            <View style={ESTILOS.form}>
                <Text style={ESTILOS.label}>Insira os valores</Text>
                <TextInput
                    placeholder="Prisma ou Piramide"
                    style={ESTILOS.input}
                />
                <TextInput
                    placeholder="Altura"
                    style={ESTILOS.input}
                />
                <TextInput
                    placeholder="Comprimento"
                    style={ESTILOS.input}
                />
                <TextInput
                    placeholder="largura"
                    style={ESTILOS.input}
                />
            </View>
            <TouchableOpacity style={ESTILOS.button}>
                <Text style={ESTILOS.buttonText}>Resultado</Text>
                <FontAwesome5 name="calculator" size={24} color="#fff" />
            </TouchableOpacity>

            <ScrollView style={ESTILOS.containerScroll}
                contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }}
                showsVerticalScrollIndicator={false}>

                <View style={ESTILOS.content}>
                    <Text style={ESTILOS.title}>Pensando no resultado...</Text>
                </View>

                <View style={ESTILOS.content}>
                    <Text style={ESTILOS.title}>O volume do {} é igual á:</Text>
                </View>

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
        backgroundColor: '#5656ff',
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