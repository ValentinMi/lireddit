import { NextPage } from "next";
import Wrapper from "../../components/Wrapper";
import { Formik, Form } from "formik";
import { useChangePasswordMutation } from "../../generated/graphql";
import InputField from "../../components/InputField";
import { Button, Box } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { toErrorMap } from "../../utils/toErrorMap";
import { useState } from "react";
import _Alert from "../../components/_Alert";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState<false | string>(false);
  return (
    <Wrapper>
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            newPassword: values.newPassword,
            token
          });
          if (response.data?.changePassword.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            } else {
              setErrors(errorMap);
            }
          } else if (response.data?.changePassword.user) {
            // Worked
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="new password"
              label="New password"
              type="password"
            />
            <Box></Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Confirm
            </Button>
          </Form>
        )}
      </Formik>
      {tokenError && (
        <_Alert
          status="error"
          description={tokenError}
          title="Token issue"
          onClose={() => setTokenError(false)}
        />
      )}
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string
  };
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);
