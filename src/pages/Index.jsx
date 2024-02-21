import React, { useState } from "react";
import { ChakraProvider, Box, Text, Input, Button, VStack, HStack, IconButton, useToast, extendTheme } from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "gray.100",
      },
    },
  },
});

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      toast({
        title: "No content",
        description: "Todo can't be empty",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    setTodos([...todos, inputValue]);
    setInputValue("");
  };

  const handleDeleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const handleInputChange = (event) => setInputValue(event.target.value);

  return (
    <ChakraProvider theme={theme}>
      <Box maxW="md" mx="auto" mt="10">
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Todo App
          </Text>
          <HStack w="full">
            <Input value={inputValue} onChange={handleInputChange} placeholder="Add a new todo" />
            <IconButton icon={<FaPlus />} onClick={handleAddTodo} colorScheme="blue" aria-label="Add todo" />
          </HStack>
          <VStack w="full" spacing={2}>
            {todos.map((todo, index) => (
              <HStack key={index} w="full" bg="white" p={3} boxShadow="md" justifyContent="space-between" borderRadius="md">
                <Text>{todo}</Text>
                <IconButton icon={<FaTrash />} onClick={() => handleDeleteTodo(index)} colorScheme="red" aria-label="Delete todo" />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default Index;
