import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableWithoutFeedback, Keyboard, Button } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [sentimentResult, setSentimentResult] = useState('');

  const checkSentiment = async () => {
    try {
      const response = await fetch('http://172.16.21.86:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text }),
      });

      const sentiment = await response.json();
      const sentimentLabel = sentiment.length > 0 ? sentiment[0].label : 'Unknown';
      setSentimentResult(getUserFriendlySentiment(sentimentLabel));
    } catch (error) {
      console.error(error);
    }
  };

  const getUserFriendlySentiment = (sentiment) => {
    switch (sentiment) {
      case 'POSITIVE':
        return 'Happy 😊';
      case 'NEGATIVE':
        return 'Sad 😔';
      default:
        return 'Neutral 😐';
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TextInput 
          style={styles.textInput}
          multiline={true}
          value={text}
          onChangeText={setText}
          placeholder="Type your text here..."
        />
        <Button title="Check sentiment" onPress={checkSentiment} />
        <Text style={styles.resultText}>{sentimentResult}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textInput: {
    marginTop: '15%',
    borderColor: 'black',
    borderRadius: 20,
    borderWidth: 1,
    width: '100%',
    padding: 20,
  },
  resultText: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
