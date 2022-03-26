import type { NextPage } from "next";
import Head from "next/head";
import {
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  Box,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import { load, formatCurrency, computeSpendData } from "../src/functions";
import BuiltWithInfoBar from "../src/components/BuiltWithInfoBar";
import StatsComponent from "../src/components/StatsComponent";

const Home: NextPage = () => {
  // State hooks
  const [input, setInput] = useState<string>("");
  const [refresh, setRefresh] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [account, setAccount] = useState<any>(null);
  const [contract, setContract] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [ethPrice, setEthPrice] = useState<any>(null);

  const [balances, setBalances] = useState<string[]>([]);
  const [transactions, setTransactions] = useState([]);

  const [spendData, setSpendData] = useState({ last: 0, tot: 0 });

  // Handlers
  const handleType = (e: any) => setInput(e.currentTarget.value);

  const handleAdd = async () => {
    setLoading(true);
    await contract.createTask(input, { from: account }).catch((e: any) => {
      setLoading(false);
      console.log("User Rejected, e: ", e);
    });
    setInput("");
    setRefresh(true);
  };

  const handleToggleCompleted = async (id: number) => {
    setLoading(true);
    await contract.toggleCompleted(id, { from: account }).catch((e: any) => {
      setLoading(false);
      console.log("User Rejected, e: ", e);
    });
    setRefresh(true);
  };

  const handleToggleInProgress = async (id: number) => {
    setLoading(true);
    await contract.toggleInProgress(id, { from: account }).catch((e: any) => {
      setLoading(false);
      console.log("User Rejected, e: ", e);
    });
    setRefresh(true);
  };

  // Effects
  useEffect(() => {
    const handleLoad = async (e: any) => {
      setAccount(e.account);
      setBalances([...balances, e.balance]);
      setTasks(e.tasks);
      setContract(e.todoContract);
      setEthPrice(e.ethPrice);
      setTransactions(e.transactions);
      setSpendData(computeSpendData(e.transactions, e.account));
    };

    if (!refresh) return;
    setLoading(true);
    load()
      .then((e) => {
        handleLoad(e);
      })
      .then(() => setLoading(false));
    setRefresh(false);
  }, [balances, refresh]);

  // Constants
  const totSpentFormatted = formatCurrency(ethPrice * spendData.tot);
  const transactionCount = transactions.length;
  const lastSpentFormatted = formatCurrency(ethPrice * spendData.last);

  return (
    <VStack>
      <Head>
        <title>Lavish Sprints</title>
        <meta name="description" content="Blockchain Todo List" />
        <link rel="icon" href="/coin.gif" />
      </Head>
      <HStack w="full">
        <Spacer />
        <VStack>
          <Box h="20px" />
          <BuiltWithInfoBar />
          <Box h="20px" />
          <VStack>
            <Box h="40px" />
            <Heading>Lavish Sprints</Heading>
            <Box h="20px" />
            <Text as="samp">the most expensive way to manage your sprints</Text>
            <Box h="60px" />
            {/* {transactions && ( */}
            {loading ? (
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.800"
                size="xl"
              />
            ) : (
              <StatsComponent
                totSpentFormatted={totSpentFormatted}
                transactionCount={transactionCount}
                lastSpentFormatted={lastSpentFormatted}
              />
            )}
            <Box h="40px" />
            <HStack w="md">
              <Input
                type="text"
                size="md"
                placeholder="New Task..."
                onChange={handleType}
                value={input}
              />
              <Button
                onClick={handleAdd}
                _hover={{ bg: "green.200" }}
                isLoading={refresh}
              >
                🧘‍♀️
              </Button>
            </HStack>
          </VStack>
          <Box h="40px" />
          <HStack w="full" flex="1" alignItems="flex-start">
            <Spacer />
            <VStack>
              <Text>🧘‍♀️</Text>
              <Text>Todo</Text>
              <Box h="40px" />
              {tasks === null ? (
                <Spinner />
              ) : (
                tasks.map((task, idx) =>
                  !task[2] && !task[3] ? (
                    <HStack key={idx} bg="gray.100" borderRadius={7}>
                      <Button
                        _hover={{ bg: "pink.200" }}
                        onClick={() =>
                          handleToggleCompleted(task[0].toNumber())
                        }
                      >
                        🙅‍♀️
                      </Button>
                      <Box w="15px" />
                      <Text>{task[1]}</Text>
                      <Box w="15px" />
                      <Button
                        _hover={{ bg: "green.200" }}
                        onClick={() =>
                          handleToggleInProgress(task[0].toNumber())
                        }
                      >
                        🤸‍♀️
                      </Button>
                    </HStack>
                  ) : null
                )
              )}
            </VStack>
            <Box w="40px" />
            <VStack>
              <Text>🤸‍♀️</Text>
              <Text>In Progress</Text>
              <Box h="40px" />
              {tasks === null ? (
                <Spinner />
              ) : (
                tasks.map((task, idx) =>
                  task[2] && !task[3] ? (
                    <HStack key={idx} bg="gray.100" borderRadius={7}>
                      <Button
                        _hover={{ bg: "pink.200" }}
                        onClick={() =>
                          handleToggleInProgress(task[0].toNumber())
                        }
                      >
                        🧘‍♀️
                      </Button>
                      <Box w="15px" />
                      <Text>{task[1]}</Text>
                      <Box w="15px" />
                      <Button
                        _hover={{ bg: "green.200" }}
                        onClick={() =>
                          handleToggleCompleted(task[0].toNumber())
                        }
                      >
                        👍
                      </Button>
                    </HStack>
                  ) : null
                )
              )}
            </VStack>
            <Box w="40px" />
            <VStack>
              <Text>👍</Text>
              <Text>Done</Text>
              <Box h="40px" />
              {tasks === null ? (
                <Spinner />
              ) : (
                tasks.map((task, idx) =>
                  task[2] && task[3] ? (
                    <HStack key={idx} bg="gray.100" borderRadius={7}>
                      <Button
                        _hover={{ bg: "pink.200" }}
                        onClick={() =>
                          handleToggleCompleted(task[0].toNumber())
                        }
                      >
                        🤸‍♀️
                      </Button>
                      <Box w="15px" />
                      <Text>{task[1]}</Text>
                      <Box w="15px" />
                      <Button
                        _hover={{ bg: "green.200" }}
                        onClick={() =>
                          handleToggleInProgress(task[0].toNumber())
                        }
                      >
                        🙅‍♀️
                      </Button>
                    </HStack>
                  ) : null
                )
              )}
            </VStack>
            <Spacer />
          </HStack>
          <Box h="40px" />
        </VStack>
        <Spacer />
      </HStack>
    </VStack>
  );
};

export default Home;
