import React from "react";
import {
  Alert,
  AlertProps,
  AlertTitle,
  AlertIcon,
  AlertDescription,
  CloseButton
} from "@chakra-ui/core";

const _Alert: React.FC<
  AlertProps & { description: string; onClose: () => any }
> = ({ status, title, description, onClose }) => {
  return (
    <Alert status={status} variant="left-accent" style={{ marginTop: "30px" }}>
      <AlertIcon />
      <AlertTitle mr={2}>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={onClose}
      />
    </Alert>
  );
};

export default _Alert;
