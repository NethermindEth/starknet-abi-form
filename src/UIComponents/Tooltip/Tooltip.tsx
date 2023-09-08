import React from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';

const { Root } = Tooltip;
const { Provider } = Tooltip;
const { Trigger } = Tooltip;
const { Portal } = Tooltip;
const Content: React.FC<Tooltip.TooltipContentProps> = (props) => (
  <Tooltip.Content
    className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]"
    {...props}
  >
    {props.children}
  </Tooltip.Content>
);

export { Root, Provider, Trigger, Portal, Content };
