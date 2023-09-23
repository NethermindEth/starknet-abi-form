import * as Select from '@radix-ui/react-select';
import React, { RefObject } from 'react';

const Root = Select.Root;
const Content = Select.Content;
const Trigger = Select.Trigger;
const Viewport = Select.Viewport;

const Group = Select.Group;
const Separator = Select.Separator;

const Label = Select.Label;
const Item = Select.Item;

const ItemIndicator = Select.ItemIndicator;
const ItemText = Select.ItemText;

const Portal = Select.Portal;
const ScrollDownButton = Select.ScrollDownButton;

const SelectItem = React.forwardRef(
  (
    { children, className, ...props }: Select.SelectItemProps,
    forwardedRef: React.Ref<HTMLDivElement>
  ) => {
    return (
      <Select.Item
        className={`text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] pr-[35px] pl-[25px] relative select-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:outline-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1',
          ${className}`}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
          <span className="dot" />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export {
  Root,
  Portal,
  Content,
  Trigger,
  Viewport,
  SelectItem,
  Group,
  Separator,
  Label,
  Item,
  ItemIndicator,
  ItemText,
  ScrollDownButton,
};
