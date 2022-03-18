import React, { useState, FC } from "react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  Box,
  ButtonGroup,
} from "@chakra-ui/react";

import type { popoverContent } from "../constants";
interface Props {
  trigger: string;
  content: typeof popoverContent;
}

export const WalkthroughPopover: FC<Props> = ({ trigger, content }) => {
  const [step, setStep] = useState(0);

  return (
    <Popover placement="bottom" closeOnBlur={false}>
      <PopoverTrigger>
        <Button _hover={{ bg: "gray.200" }}>{trigger}</Button>
      </PopoverTrigger>
      <PopoverContent color="white" bg="blue.800" borderColor="blue.800">
        <PopoverHeader pt={4} fontWeight="bold" border="0">
          {content[step].title}
        </PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody style={{ whiteSpace: "pre-wrap" }}>
          {content[step].body}
        </PopoverBody>
        <PopoverFooter
          border="0"
          d="flex"
          alignItems="center"
          justifyContent="space-between"
          pb={4}
        >
          <Box fontSize="sm">
            Step {step + 1} of {Object.keys(content).length}
          </Box>
          <ButtonGroup size="sm">
            <Button
              colorScheme="transparent"
              _hover={{ bg: "blue.600" }}
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              👈
            </Button>
            <Button
              colorScheme="transparent"
              _hover={{ bg: "blue.600" }}
              disabled={step === Object.keys(content).length - 1}
              onClick={() => setStep(step + 1)}
            >
              👉
            </Button>
          </ButtonGroup>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};
