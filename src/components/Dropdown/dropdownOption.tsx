import '../../styles/components/Dropdown/dropdownOptions.css';
import type { SelectedModelsProps } from '../Props.tsx';

export default function DropdownOption({
  title,
  onSelect,
  selected,
}: Readonly<{
  title: string;
  onSelect?: (model: string) => void;
  selected?: SelectedModelsProps;
}>) {
  const exists = selected?.[title];

  let isSelected = !!(exists && selected[title].selected);

  return (
    <button
      className={`dropdown_option card ${
        isSelected ? 'selected' : 'hoverable'
      }`}
      onClick={() => onSelect?.(title)}
    >
      <img src={exists ? selected[title].logo : ''} alt={title + ' logo'} />
      <p>{title}</p>
    </button>
  );
}
