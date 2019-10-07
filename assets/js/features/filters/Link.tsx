import React, { ReactNode } from "react";

interface Props {
  active: boolean;
  filter: string;
  setVisibilityFilter: (a: string) => void;
  children: ReactNode;
}

const Link = ({ active, children, setVisibilityFilter, filter }: Props) => (
  <button
    onClick={() => setVisibilityFilter(filter)}
    disabled={active}
    className="ml-2 underline text-blue-600"
  >
    {children}
  </button>
);

export default Link;
