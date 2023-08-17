export const Search = (placeholder) => {
  return `
      <div class="search">
        <input
          class="search-input"
          type="search"
          id="search"
          placeholder="${placeholder}"
        />
      </div>
    `;
};
