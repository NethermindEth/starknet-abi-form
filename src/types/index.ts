import * as Yup from 'yup';

const yupAbiInputSchema = Yup.object().shape({
  name: Yup.string().strict(true).required(),
  type: Yup.string().strict(true).required(),
});

const yupAbiStructMemberSchema = Yup.object().shape({
  name: Yup.string().strict(true).required(),
  type: Yup.string().strict(true).required(),
});

const yupAbiEnumVariantSchema = Yup.object().shape({
  name: Yup.string().strict(true).required(),
  type: Yup.string().strict(true).required(),
});

const yupAbiOutputSchema = Yup.object().shape({
  type: Yup.string().strict(true).required(),
});

const yupAbiStateMutabilitySchema = Yup.string()
  .strict(true)
  .required()
  .oneOf(['view', 'external']);

const yupAbiEventKindSchema = Yup.string()
  .strict(true)
  .required()
  .oneOf(['struct', 'enum']);

const yupAbiEventFieldSchema = Yup.object().shape({
  name: Yup.string().strict(true).required(),
  type: Yup.string().strict(true).required(),
  kind: Yup.string().strict(true).required().oneOf(['key', 'data', 'nested']),
});

const yupAbiEnumEventSchema = Yup.object().shape({
  kind: Yup.string().strict(true).required().oneOf(['enum']),
  variants: yupAbiEventFieldSchema,
});

const yupAbiStructEventSchema = Yup.object().shape({
  kind: Yup.string().strict(true).required().oneOf(['struct']),
  members: yupAbiEventFieldSchema,
});

const yupAbiEventSchema = Yup.object().shape({
  name: Yup.string().strict(true).required(),
  type: Yup.string().strict(true).required().oneOf(['event']),
  kind: yupAbiEventKindSchema,
  members: Yup.array(yupAbiEventFieldSchema).optional(),
  variants: Yup.array(yupAbiEventFieldSchema).optional(),
});

const yupAbiFunctionSchema = Yup.object().shape({
  type: Yup.string().strict(true).required().oneOf(['function']),
  name: Yup.string().strict(true).required(),
  inputs: Yup.array(yupAbiInputSchema).required(),
  outputs: Yup.array(yupAbiOutputSchema).required(),
  state_mutability: yupAbiStateMutabilitySchema,
});

const yupAbiConstructorSchema = Yup.object().shape({
  type: Yup.string().strict(true).required().oneOf(['constructor']),
  name: Yup.string().strict(true).required().oneOf(['constructor']),
  inputs: Yup.array(yupAbiInputSchema).required(),
});

const yupAbiL1HandlerSchema = Yup.object().shape({
  type: Yup.string().strict(true).required().oneOf(['l1_handler']),
  name: Yup.string().strict(true).required(),
  inputs: Yup.array(yupAbiInputSchema).required(),
  outputs: Yup.array(yupAbiOutputSchema).required(),
  state_mutability: yupAbiStateMutabilitySchema,
});

const yupAbiStructSchema = Yup.object().shape({
  type: Yup.string().strict(true).required().oneOf(['struct']),
  name: Yup.string().strict(true).required(),
  members: Yup.array(yupAbiStructMemberSchema).required(),
});

const yupAbiEnumSchema = Yup.object().shape({
  type: Yup.string().strict(true).required().oneOf(['enum']),
  name: Yup.string().strict(true).required(),
  variants: Yup.array(yupAbiEnumVariantSchema).required(),
});

const yupAbiInterfaceSchema = Yup.object().shape({
  type: Yup.string().strict(true).required().oneOf(['interface']),
  name: Yup.string().strict(true).required(),
  items: Yup.array(yupAbiFunctionSchema).required(),
});

const yupAbiImplSchema = Yup.object().shape({
  type: Yup.string().strict(true).required().oneOf(['impl']),
  name: Yup.string().strict(true).required(),
  interface_name: Yup.string().strict(true).required(),
});

type ABIFunction = Yup.InferType<typeof yupAbiFunctionSchema>;

type ABIConstructor = Yup.InferType<typeof yupAbiConstructorSchema>;

type ABIL1Handler = Yup.InferType<typeof yupAbiL1HandlerSchema>;

type ABIStruct = Yup.InferType<typeof yupAbiStructSchema>;

type ABIEnum = Yup.InferType<typeof yupAbiEnumSchema>;

type ABIInterface = Yup.InferType<typeof yupAbiInterfaceSchema>;

type ABIImpl = Yup.InferType<typeof yupAbiImplSchema>;

type ABIEvent = Yup.InferType<typeof yupAbiEventSchema>;

type ABIFunctionInputs = Yup.InferType<typeof yupAbiInputSchema>;

const abiSchema = Yup.array().of(
  Yup.object().test(
    'schema-test',
    'Must follow schema of \
        respective type, if type: \
        "function" | "constructor" | "l1_handler" | "struct" | "enum" | "interface" | "impl" | "event"',
    (value: any) => {
      try {
        switch (value.type) {
          case 'function':
            yupAbiFunctionSchema.validateSync(value);
            return true;
          case 'constructor':
            yupAbiConstructorSchema.validateSync(value);
            return true;
          case 'l1_handler':
            yupAbiL1HandlerSchema.validateSync(value);
            return true;
          case 'struct':
            yupAbiStructSchema.validateSync(value);
            return true;
          case 'enum':
            yupAbiEnumSchema.validateSync(value);
            return true;
          case 'interface':
            yupAbiInterfaceSchema.validateSync(value);
            return true;
          case 'impl':
            yupAbiImplSchema.validateSync(value);
            return true;
          case 'event':
            yupAbiEventSchema.validateSync(value);
            return true;
          default:
            return false;
        }
      } catch (e: any) {
        throw new Yup.ValidationError(e);
      }
    }
  )
);

type ABI = Yup.InferType<typeof abiSchema>;

export {
  abiSchema,
  yupAbiConstructorSchema,
  yupAbiEnumEventSchema,
  yupAbiEnumSchema,
  yupAbiEnumVariantSchema,
  yupAbiStructEventSchema,
  yupAbiEventFieldSchema,
  yupAbiEventKindSchema,
  yupAbiFunctionSchema,
  yupAbiEventSchema,
  yupAbiImplSchema,
  yupAbiInputSchema,
  yupAbiStructSchema,
  yupAbiInterfaceSchema,
  yupAbiL1HandlerSchema,
};

export type {
  ABI,
  ABIConstructor,
  ABIEnum,
  ABIEvent,
  ABIFunction,
  ABIImpl,
  ABIInterface,
  ABIL1Handler,
  ABIStruct,
  ABIFunctionInputs,
};
