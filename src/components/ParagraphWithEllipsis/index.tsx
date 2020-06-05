import React from 'react';

import { ParagraphWithEllipsisProps } from '../../types';

export const ParagraphWithEllipsis = ({ children }: ParagraphWithEllipsisProps) =>
  <p>{children} ...</p>;
