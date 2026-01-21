import {
  Box,
  Center,
  Container,
  Heading,
  IconButton,
  Spinner,
  Stack,
  Table,
} from "@chakra-ui/react";
import { Pencil, Trash } from "lucide-react";
import { deleteRecord, GetAllRecords } from "./lib/record";
import { useEffect, useState } from "react";
import type { Record } from "./domain/record";
import { RecordEditDialog } from "./components/organisms/RecordEditDialog";
import { RecordCreateDialog } from "./components/organisms/RecordCreateDialog";

function App() {
  console.log("Appレンダリング");
  const [records, setRecords] = useState<Record[]>([]);
  const [isMainLoading, setIsMainLoading] = useState(false);

  const [editRecord, setEditRecord] = useState<Record | null>();

  const getAllRecords = async () => {
    setIsMainLoading(true);
    const recordsData = await GetAllRecords();
    setRecords(recordsData);
    setIsMainLoading(false);
  };

  const onClickDeleteRecord = async (recordId: number) => {
    await deleteRecord(recordId);
    getAllRecords();
  };

  useEffect(() => {
    getAllRecords();
  }, []);

  return (
    <>
      <Container maxW={800}>
        <Stack mt={30} gap={12}>
          <Center>
            <Heading as="h1" size="4xl" fontWeight="bold">
              学習記録アプリ-TS
            </Heading>
          </Center>
          {isMainLoading ? (
            <Center>
              <Spinner size="lg" />
            </Center>
          ) : (
            <>
              <Box textAlign={"right"}>
                <RecordCreateDialog onUpdated={getAllRecords} />
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
                  {records.map((record) => {
                    return (
                      <Table.Row key={record.id}>
                        <Table.Cell>{record.title}</Table.Cell>
                        <Table.Cell>{record.time}</Table.Cell>
                        <Table.Cell textAlign={"center"}>
                          <IconButton
                            variant={"ghost"}
                            onClick={() => setEditRecord(record)}
                          >
                            <Pencil color="green" />
                          </IconButton>
                        </Table.Cell>
                        <Table.Cell textAlign={"center"}>
                          <IconButton
                            variant={"ghost"}
                            onClick={() => onClickDeleteRecord(record.id)}
                          >
                            <Trash color="red" />
                          </IconButton>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                  {editRecord && (
                    <RecordEditDialog
                      editRecord={editRecord}
                      isOpen={!!editRecord}
                      onClose={() => setEditRecord(null)}
                      onUpdated={getAllRecords}
                    />
                  )}
                </Table.Body>
              </Table.Root>
            </>
          )}
        </Stack>
      </Container>
    </>
  );
}

export default App;
