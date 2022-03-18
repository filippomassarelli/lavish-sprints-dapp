import { HStack, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { popoverContent } from "../constants";
import { WalkthroughPopover } from "./Popover";

const BuiltWithInfoBar = () => {
  return (
    <HStack w="full">
      <Spacer />

      <Image src="/next-icon.png" alt="next icon" width={50} height={30} />
      <Spacer />
      <Image
        src="/typescript-icon.png"
        alt="typescript icon"
        width={25}
        height={25}
      />
      <Spacer />
      <Image
        src="/chainlink-icon.png"
        alt="chainlink icon"
        width={30}
        height={30}
      />
      <Spacer />
      <Image
        src="/truffle-icon.png"
        alt="truffle icon"
        width={30}
        height={30}
      />
      <Spacer />
      <Image
        src="/ganache-icon.png"
        alt="ganache icon"
        width={26}
        height={30}
      />
      <Spacer />
      <Image
        src="/infura_logo_black.png"
        alt="infura icon"
        width={35}
        height={40}
      />
      <Spacer />
      <Image
        src="/solidity-icon.png"
        alt="solidity icon"
        width={20}
        height={30}
      />
      <Spacer />
      <WalkthroughPopover trigger="tech stack ?" content={popoverContent} />
      <Spacer />
    </HStack>
  );
};

export default BuiltWithInfoBar;
