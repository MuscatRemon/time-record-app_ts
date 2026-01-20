import {
  Box,
  Center,
  CloseButton,
  Container,
  Dialog,
  Field,
  Heading,
  IconButton,
  Input,
  Portal,
  Spinner,
  Stack,
  Table,
} from "@chakra-ui/react";
import { Pencil, Trash } from "lucide-react";
import { deleteRecord, GetAllRecords, insertRecord } from "./lib/record";
import { useEffect, useState } from "react";
import type { Record } from "./domain/record";
import { PrimaryButton } from "./components/atoms/PrimaryButton";
import { RecordEditDialog } from "./components/organisms/RecordEditDialog";

function App() {
  console.log("Appレンダリング");
  const [records, setRecords] = useState<Record[]>([]);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputTime, setInputTime] = useState<number | "">("");
  const [isMainLoading, setIsMainLoading] = useState(false);

  const [editRecord, setEditRecord] = useState<Record | null>();

  useEffect(() => {
    setIsMainLoading(true);

    const getAllRecords = async () => {
      const recordsData = await GetAllRecords();
      setRecords(recordsData);
      setIsMainLoading(false);
    };

    getAllRecords();
  }, []);

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(e.target.value);
  };

  const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = Number(value);

    if (num < 0) {
      setInputTime(0);
    } else {
      setInputTime(num);
    }
  };

  const onClickRegistration = async () => {
    if (!inputTitle || !inputTime) {
      // setIsAlert(true);
      alert("入力内容が正しくありません");
      return;
    }

    await insertRecord(inputTitle, inputTime);
    renderingRecord();
    setInputTitle("");
    setInputTime("");
    // setIsAlert(false);
  };

  const onClickDeleteRecord = async (recordId: number) => {
    await deleteRecord(recordId);
    renderingRecord();
  };

  const renderingRecord = async () => {
    const studyRecord = await GetAllRecords();
    setRecords(studyRecord);
  };

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
                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <PrimaryButton w={140}>新規登録</PrimaryButton>
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content>
                        <Dialog.Header>
                          <Dialog.Title>新規登録</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                          <Stack gap="4" align="flex-start" maxW="sm">
                            <Field.Root>
                              <Field.Label>学習内容</Field.Label>
                              <Input
                                placeholder="reactの学習"
                                variant="outline"
                                size="sm"
                                value={inputTitle}
                                onChange={onChangeTitle}
                              />
                            </Field.Root>
                            <Field.Root>
                              <Field.Label>学習時間</Field.Label>
                              <Input
                                placeholder="0"
                                variant="outline"
                                size="sm"
                                type="number"
                                min="0"
                                value={inputTime}
                                onChange={onChangeTime}
                              />
                            </Field.Root>
                          </Stack>
                        </Dialog.Body>
                        <Dialog.Footer justifyContent={"left"}>
                          <PrimaryButton onClick={onClickRegistration}>
                            登録
                          </PrimaryButton>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                          <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>
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
                      onUpdated={renderingRecord}
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
