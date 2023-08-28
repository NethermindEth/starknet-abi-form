import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import classNames from 'classnames';

const AccordionRoot = Accordion.Root;

const AccordionItem = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: React.ComponentProps<typeof Accordion.Item>,
    forwardedRef: React.Ref<HTMLDivElement>
  ) => (
    <Accordion.Item
      className={classNames(
        'mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10 focus-within:shadow-[0_0_0_2px] focus-within:shadow-purple-500',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      {children}
    </Accordion.Item>
  )
);

const AccordionTrigger = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: React.ComponentProps<typeof Accordion.Trigger>,
    forwardedRef: React.Ref<HTMLButtonElement>
  ) => (
    <Accordion.Header className="flex">
      <Accordion.Trigger
        className={classNames(
          'group flex h-[45px] flex-1 cursor-default items-center justify-between px-5 text-[15px] leading-none shadow-[0_1px_0] shadow-green-500 outline-none ',
          className
        )}
        {...props}
        ref={forwardedRef}
      >
        {children}
        {/* <ChevronDownIcon
          className="ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        /> */}
      </Accordion.Trigger>
    </Accordion.Header>
  )
);

const AccordionContent = React.forwardRef(
  (
    {
      children,
      className,
      ...props
    }: React.ComponentProps<typeof Accordion.Content>,
    forwardedRef: React.Ref<HTMLDivElement>
  ) => (
    <Accordion.Content
      className={classNames(
        'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]',
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <div className="py-[15px] px-5 w-full">{children}</div>
    </Accordion.Content>
  )
);

export { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger };
