import React, { useState } from "react";
import { RecordFormFields } from "../molecules/RecordFormFields";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { insertRecord } from "@/lib/record";

type props = {
  onUpdated: () => void;
};

export const RecordCreateDialog = (props: props) => {
  const { onUpdated } = props;

  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputTime, setInputTime] = useState<number>(0);

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
    onUpdated();
    setInputTitle("");
    setInputTime(0);
    // setIsAlert(false);
  };

  return (
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
              <RecordFormFields
                inputTitle={inputTitle}
                inputTime={inputTime}
                onChangeTitle={onChangeTitle}
                onChangeTime={onChangeTime}
              />
            </Dialog.Body>
            <Dialog.Footer justifyContent={"left"}>
              <PrimaryButton onClick={onClickRegistration}>登録</PrimaryButton>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
