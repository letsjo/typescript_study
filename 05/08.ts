interface ComponentProps {
  onSelectItem: (item: { id: number }) => void;
}
function renderSelector(props: ComponentProps) {
  /* ... */
}

let selectedId: number = 0;
function handleSelectItem(item: { id: number }) {
  selectedId = item.id;
}

renderSelector({ onSelectItem: handleSelectItem });

export default {};
