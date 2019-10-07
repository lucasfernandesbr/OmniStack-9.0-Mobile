import React, { useState } from 'react';
import { SafeAreaView, Alert, StyleSheet, Text, TextInput, TouchableOpacity, Platform, StatusBar, AsyncStorage } from 'react-native';

import api from '../services/api';

export default function Book({ navigation }){
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');
    
    async function handleSubmit(){
        const user = await AsyncStorage.getItem('user');

        await api.post(`/spot/${id}/bookings`, {
            date
        }, {
            headers: { user }
        })

        Alert.alert('Solicitação de reserva enviada!');

        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE*</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data deseja reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar Reserva</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight: 0
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },

    cancelButton: {
        marginTop: 10,
        backgroundColor: '#ccc'
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
})
