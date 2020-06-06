import React from 'react';

export type Story = {
  objectID: number;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

export type Stories = Array<Story>;

export type ItemProps = {
  item: Story;
  onRemoveItem: (item: Story) => void;
};

export type ListProps = {
  list: Stories;
  onRemoveItem: (item: Story) => void;
};

export type SearchFormProps = {
  searchTerm: string;
  onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export type InputWithLabelProps = {
  id: string;
  value: string;
  type?: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFocused?: boolean;
  children: React.ReactNode;
};

type ButtonType = "button" | "submit";

export type ButtonProps = {
  type?: ButtonType;
  isDisabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
};

export type ParagraphWithEllipsisProps = {
  children: React.ReactNode;
};

export type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
};

interface StoriesFetchInitAction {
  type: 'STORIES_FETCH_INIT';
}

interface StoriesFetchSuccessAction {
  type: 'STORIES_FETCH_SUCCESS';
  payload: Stories;
}

interface StoriesFetchFailureAction {
  type: 'STORIES_FETCH_FAILURE';
}

interface StoriesRemoveAction {
  type: 'REMOVE_STORY';
  payload: Story;
}

export type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | StoriesRemoveAction;

export enum SORTS_ENUM {
  NONE = 'NONE',
  TITLE = 'TITLE',
  AUTHOR = 'AUTHOR',
  COMMENT = 'COMMENT',
  POINT = 'POINT',
};

export type Sorting = {
  sortKey: SORTS_ENUM;
  isReverse: boolean;
};
