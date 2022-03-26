import { Heading, Text, Box, HStack } from "@chakra-ui/react";
import Image from "next/image";
import React, { FC } from "react";

interface Props {
  totSpentFormatted: string;
  transactionCount: number;
  lastSpentFormatted: string;
}

const StatsComponent: FC<Props> = ({
  totSpentFormatted,
  transactionCount,
  lastSpentFormatted,
}) => {
  return (
    <>
      <HStack>
        <Image src="/coin.gif" alt="spinning coin gif" width={50} height={50} />
        <Heading>${totSpentFormatted}</Heading>
      </HStack>
      <Box h="10px" />
      <Text as="samp">Spent across {transactionCount} actions</Text>
      <Text as="samp" fontSize="xs">
        last action cost ${lastSpentFormatted}
      </Text>
    </>
  );
};

export default StatsComponent;
