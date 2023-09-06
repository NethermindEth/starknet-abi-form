import React from 'react';

export type TagColors =
  | 'blue'
  | 'gray'
  | 'red'
  | 'green'
  | 'yellow'
  | 'indigo'
  | 'purple'
  | 'pink';

const BadgeClasses: Record<TagColors, string> = {
  blue: 'bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 tag-blue',
  gray: 'bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 tag-gray',
  green:
    'bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300 tag-green',
  indigo:
    'bg-indigo-100 text-indigo-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300 tag-indigo',
  pink: 'bg-pink-100 text-pink-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300 tag-pink',
  purple:
    'bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300 tag-purple',
  red: 'bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300 tag-red',
  yellow:
    'bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 tag-yellow',
};

const Tag: React.FC<{ tag?: TagColors } & React.HTMLProps<HTMLSpanElement>> = ({
  tag = 'blue',
  children,
  ...props
}) => (
  <span className={BadgeClasses[tag] ?? ''} {...props}>
    {children}
  </span>
);

export default Tag;
