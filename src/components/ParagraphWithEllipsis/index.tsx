import React from 'react';

import { ParagraphWithEllipsisProps } from '../../types';

const ParagraphWithEllipsis = ({ children }: ParagraphWithEllipsisProps) =>
  <p>{children} ...</p>;

export default ParagraphWithEllipsis;
