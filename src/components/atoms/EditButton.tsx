import { IconButton } from "@chakra-ui/react";
import { Pencil } from "lucide-react";

type props = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const EditButton = (props: props) => {
  const { onClick } = props;

  return (
    <IconButton variant={"ghost"} aria-label="Edit" onClick={onClick}>
      <Pencil color="green" />
    </IconButton>
  );
};
