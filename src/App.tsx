import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  IconButton,
  Stack,
  Table,
} from "@chakra-ui/react";
import { Pencil, Trash } from "lucide-react";
import { GetAllRecords } from "./lib/record";

function App() {
  GetAllRecords();

  return (
    <>
      <Container maxW={800}>
        <Stack mt={30} gap={12}>
          <Center>
            <Heading as="h1" size="4xl" fontWeight="bold">
              学習記録アプリ-TS
            </Heading>
          </Center>
          <Box textAlign={"right"}>
            <Button w={140} bg={"blue.600"}>
              新規登録
            </Button>
          </Box>
          <Table.Root tableLayout={"fixed"} w={"100%"}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader>学習内容</Table.ColumnHeader>
                <Table.ColumnHeader>学習時間</Table.ColumnHeader>
                <Table.ColumnHeader w={"10%"}></Table.ColumnHeader>
                <Table.ColumnHeader w={"10%"}></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {/* {items.map((item) => (
                <Table.Row key={item.id}>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>{item.category}</Table.Cell>
                  <Table.Cell textAlign="end">{item.price}</Table.Cell>
                </Table.Row>
              ))} */}
              <Table.Row>
                <Table.Cell>typescriptの学習</Table.Cell>
                <Table.Cell>3時間</Table.Cell>
                <Table.Cell textAlign={"center"}>
                  <IconButton variant={"ghost"}>
                    <Pencil color="green" />
                  </IconButton>
                </Table.Cell>
                <Table.Cell textAlign={"center"}>
                  <IconButton variant={"ghost"}>
                    <Trash color="red" />
                  </IconButton>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Stack>
      </Container>
    </>
  );
}

export default App;
