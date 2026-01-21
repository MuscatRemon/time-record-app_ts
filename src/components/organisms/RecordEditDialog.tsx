import { RecordFormFields } from "../molecules/RecordFormFields";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { updateRecord } from "@/lib/record";
import type { Record } from "@/domain/record";
import { useForm } from "react-hook-form";
import type { FormValues } from "@/domain/recordForm";

type props = {
  editRecord: Record;
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
};

export const RecordEditDialog = (props: props) => {
  const { editRecord, isOpen, onClose, onUpdated } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: editRecord.title,
      time: editRecord.time,
    },
  });

  const onSubmit = async (data: FormValues) => {
    await updateRecord(editRecord.id, data.title, data.time);
    await onUpdated();
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
              <form>
                <RecordFormFields register={register} errors={errors} />
              </form>
            </Dialog.Body>
            <Dialog.Footer justifyContent={"left"}>
              <PrimaryButton onClick={handleSubmit(onSubmit)}>
                編集
              </PrimaryButton>
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
