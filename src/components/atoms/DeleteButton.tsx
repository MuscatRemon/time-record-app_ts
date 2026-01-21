import { IconButton } from "@chakra-ui/react";
import { Trash } from "lucide-react";

type props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const DeleteButton = (props: props) => {
  const { onClick } = props;

  return (
    <IconButton variant={"ghost"} onClick={onClick}>
      <Trash color="red" />
    </IconButton>
  );
};
