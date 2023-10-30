import z from "zod";
import { extractValidationData } from "../common/utils/extractValidationData.js";

export const repairsSchema = z.object({
  date: z.string({
    invalid_type_error: "Date must be in a correct format",
    required_error: "Date is required",
  }),
  motorsNumber: z
    .string()
    .min(12, {
      invalid_type_error: "Number can not be less than 12 characteres",
    })
    .max(50),
  description: z.string(),
  userId: z.number(),
});

export const validateRepair = (data) => {
  const result = repairsSchema.safeParse(data);
  const {
    hasError,
    errorMessage,
    data: repairData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    repairData,
  };
};

export const partialValidateRepair = (data) => {
  const result = repairsSchema.partial().safeParse(data);
  const {
    hasError,
    errorMessage,
    data: repairData,
  } = extractValidationData(result);

  return {
    hasError,
    errorMessage,
    repairData,
  };
};
