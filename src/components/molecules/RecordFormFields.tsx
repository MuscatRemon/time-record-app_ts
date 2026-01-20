import { Field, Input, Stack } from "@chakra-ui/react";

type props = {
  inputTitle: string;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputTime: number;
  onChangeTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RecordFormFields = (props: props) => {
  const { inputTitle, onChangeTitle, inputTime, onChangeTime } = props;

  return (
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
  );
};
