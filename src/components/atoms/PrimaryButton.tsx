import { Button } from "@chakra-ui/react";
import type { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  w?: number;
} & React.ComponentProps<typeof Button>;

export const PrimaryButton: FC<Props> = (props) => {
  const { children, w, ...defaultProps } = props;

  return (
    <Button w={w} bg="blue.600" {...defaultProps}>
      {children}
    </Button>
  );
};
