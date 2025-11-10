
import '../../styles/components/Dropdown/dropdownSelect.css';
import '../../styles/components/Cards/card.css';
import { useState } from 'react';
import DropdownOption from './dropdownOption';
import type { SelectedModelsProps } from '../../components/Props.tsx';

export default function DropdownSelect({
  onSelect,
  selected,
}: Readonly<{
  onSelect?: (model: string) => void;
  selected?: SelectedModelsProps;
}>) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function handleClick() {
    setDropdownOpen(!dropdownOpen);
  }

  function handleOptionSelect(model: string) {
    if (onSelect) {
      onSelect(model);
    }
  }  

  return (
    <div className="dropdown_select_container">
      <button className="dropdown_select card border" onClick={handleClick}>
        <p>Modelos</p>
        <i className={`fi fi-br-angle-${dropdownOpen ? 'up' : 'down'}`}></i>
      </button>
      <div
        className={`dropdown_options card border ${
          dropdownOpen ? 'open' : 'closed'
        }`}
      >
        {Object.keys(selected || {}).map((model) => (
          <DropdownOption
            key={model}
            onSelect={handleOptionSelect}
            selected={selected}
            title={model}
          />
        ))}
      </div>
    </div>
  );
}
