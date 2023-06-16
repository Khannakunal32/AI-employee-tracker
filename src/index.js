import { View, Text } from 'react-native'
import React from 'react'
import dotenv from 'dotenv'

dotenv.config();

const AiChatBot = () => {
    const [messages, setMessages] = useState([])

    const gptKey = process.env.GPT_API_KEY

    const handleSend = async (newMessage = []) => {
        try {
            // Get the user's message
            const userMessage = newMessage[0];

            // Add the user's message to the message state
            setMessages((previousMessages) => GiftedChat.append(previousMessages, userMessage));
            const messageText = userMessage.text.toLowerCase();
            const keyword = ['job', 'hello', 'work', 'time', 'good employee', 'company']

            if (!keywords.some(keyword => messageText.includes(keyword))){
                // if the message does not contain any of the work-related  keyword, respond with default message
                const gptMessage = {
                    _id: new Date().getTime() + 1,
                    text: "I'm your work assistant. Ask me about your work.",
                    createdAt: new Date(),
                    user: {
                        id: 2,
                        name: 'AI Chatbot'
                    }
                };
                setMessages(previousMessages => GiftedChat.append(previousMessages, gptMessage));
                return;
            }

            // if the message contains work-related keyword, fetch a response fromt he api and respond
            const response = await axios.post('https://api.openai.com/v1/engines/text-davinci-003/completions', {
                prompt: `Work related ${messageText}`,
                max_tokens: 150,
                temperature: 0.2,
                n: 1,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${gptKey}`
            }
        });
        const workResponse = repsonse.data.choices[0].text.trim();
        const gptMessage = {
            _id: new Date().getTime() + 1,
            text: workResponse,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'AI Chatbot'
            }   
        };

        setMessages(previousMessages => GiftedChat.append(previousMessages, gptMessage));
    } catch (error) {
        console.log(error);
    };
  return (
    <View>
      <Text>AiChatBot</Text>
    </View>
  )


export default AiChatBot
