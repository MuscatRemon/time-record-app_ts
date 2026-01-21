import type { FormValues } from "@/domain/recordForm";
import { Field, Input, Stack, Text } from "@chakra-ui/react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type props = {
  register: UseFormRegister<FormValues>;
  errors: FieldErrors<FormValues>;
};

export const RecordFormFields = (props: props) => {
  const { register, errors } = props;

  return (
    <Stack gap="4" align="flex-start" maxW="sm">
      <Field.Root>
        <Field.Label>学習内容</Field.Label>
        <Input
          placeholder="reactの学習"
          variant="outline"
          size="sm"
          {...register("title", { required: "内容の入力は必須です" })}
        />
        {errors.title && <Text color={"red"}>{errors.title.message}</Text>}
      </Field.Root>
      <Field.Root>
        <Field.Label>学習時間</Field.Label>
        <Input
          placeholder="1"
          variant="outline"
          size="sm"
          type="number"
          min="0"
          {...register("time", {
            required: "時間の入力は必須です",
            min: {
              value: 1,
              message: "時間は1以上である必要があります",
            },
          })}
        />
        {errors.time && <Text color={"red"}>{errors.time.message}</Text>}
      </Field.Root>
    </Stack>
  );
};
