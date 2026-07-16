import { formatCounter } from "../../lib/format";

type NumberedListProps = {
  items: readonly string[];
  className: string;
};

export default function NumberedList({
  items,
  className,
}: NumberedListProps) {
  return (
    <ul className={className}>
      {items.map((item, index) => (
        <li key={`${index}-${item}`}>
          <span aria-hidden="true">
            {formatCounter(index + 1)}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
