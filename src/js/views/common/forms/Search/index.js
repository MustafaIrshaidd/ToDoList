export const Search = (placeholder) => {
  return `
      <div class="search">
        <input
          class="search-input"
          type="search"
          id="toDoCardsSearch"
          placeholder="${placeholder}"
        />
      </div>
    `;
};
