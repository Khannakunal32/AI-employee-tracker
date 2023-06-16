import { View, Text } from "react-native";
import React, { useState } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import axios from "axios";
import responses from "./response";

GPT_API_KEY = "YOUR_API_KEY";

const AiChatBot = () => {
  const [messages, setMessages] = useState([]);

  const handleSend = async (newMessage = []) => {
    try {
      // Get the user's message
      const userMessage = newMessage[0];

      // Add the user's message to the message state
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, userMessage)
      );
      const messageText = userMessage.text.toLowerCase();
      const keywords = [
        "job",
        "hello",
        "work",
        "time",
        "good employee",
        "company",
      ];
      var workResponse = "";
      // check and return which keywrod is included in message text
      const keyword = keywords.find((keyword) => messageText.includes(keyword));
      
      if (!keyword && !keywordFromResponse) {
          workResponse = "I'm your work assistant. Ask me about your work.";
        }
        // if the message contains work-related keyword and present in responses object
        const keywordFromResponse = Object.keys(responses).find((key) =>
          messageText.includes(key)
        );
        if (keywordFromResponse) {
        workResponse = responses[keywordFromResponse];
      } else {
        // if message not in responses object, use GPT-3 to generate response
        const response = await axios.post(
          "https://api.openai.com/v1/engines/text-davinci-003/completions",
          {
            prompt: `Work related ${messageText}`,
            max_tokens: 150,
            temperature: 0.2,
            n: 1,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${GPT_API_KEY}`,
            },
          }
        );
        console.log(response.data);
        workResponse = repsonse.data.choices[0].text.trim();
      }

      const gptMessage = {
        _id: new Date().getTime() + 1,
        text: workResponse,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "AI Chatbot",
        },
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, gptMessage)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: `#F5F5F5`,
          padding: 10,
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          marginTop: 40,
          marginBottom: 5,
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: `bold`,
          }}
        >
          AI Chatbot
        </Text>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(newMessage) => handleSend(newMessage)}
        user={{ _id: 1 }}
      />
    </View>
  );
};
export default AiChatBot;
