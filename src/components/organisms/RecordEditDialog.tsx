import React, { useState } from "react";
import { RecordFormFields } from "../molecules/RecordFormFields";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { updateRecord } from "@/lib/record";
import type { Record } from "@/domain/record";

type props = {
  editRecord: Record;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
};

export const RecordEditDialog = (props: props) => {
  const { editRecord, isOpen, onClose, onUpdated } = props;

  const [inputTitle, setInputTitle] = useState(editRecord.title);
  const [inputTime, setInputTime] = useState(editRecord.time);

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

  const onClickEditRecord = async () => {
    if (!inputTitle || !inputTime) {
      alert("入力内容が正しくありません");
      return;
    }

    await updateRecord(editRecord.id, inputTitle, inputTime);
    onUpdated();
    onClose();
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => {
        if (!e.open) onClose();
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>編集</Dialog.Title>
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
              <PrimaryButton onClick={onClickEditRecord}>編集</PrimaryButton>
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
