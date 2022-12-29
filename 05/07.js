function renderSelector(props) {
    /* ... */
}
var selectedId = 0;
function handleSelectItem(item) {
    console.log(selectedId);
    selectedId = item.id;
    console.log(selectedId);
}
renderSelector({ onSelectItem: handleSelectItem });
