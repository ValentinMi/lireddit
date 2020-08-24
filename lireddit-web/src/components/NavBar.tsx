import React from "react";
import { Box, Link, Flex } from "@chakra-ui/core";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  console.log(data);
  let body = null;

  // Data is loading
  if (fetching) {
  }
  // User not logged in
  else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link color="white" mr={2}>
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
    // User is logged in
  } else {
    body = <Box>{data.me.username}</Box>;
  }
  return (
    <Flex bg="tomato" p={4}>
      <Box>{body}</Box>
    </Flex>
  );
};

export default NavBar;
