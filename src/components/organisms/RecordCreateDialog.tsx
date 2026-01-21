import { RecordFormFields } from "../molecules/RecordFormFields";
import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/PrimaryButton";
import { insertRecord } from "@/lib/record";
import { useForm } from "react-hook-form";
import type { FormValues } from "@/domain/recordForm";
import { useState } from "react";

type props = {
  onUpdated: () => void;
};

export const RecordCreateDialog = (props: props) => {
  const { onUpdated } = props;

  const [isOpen, setIsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      time: 0,
    },
  });

  const onSubmit = async (data: FormValues) => {
    await insertRecord(data.title, data.time);
    reset();
    onUpdated();
  };

  // ダイアログと閉じると入力リセット いらないのでコメントアウト
  // useEffect(() => {
  //   if (!isOpen) reset();
  // }, [isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <PrimaryButton w={140} onClick={() => setIsOpen(true)}>
        新規登録
      </PrimaryButton>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>新規登録</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <form>
                <RecordFormFields register={register} errors={errors} />
              </form>
            </Dialog.Body>
            <Dialog.Footer justifyContent={"left"}>
              <PrimaryButton onClick={handleSubmit(onSubmit)}>
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
  );
};
