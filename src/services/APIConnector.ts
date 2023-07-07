class APIConnector {
  index: string;
  constructor(index: string) {
    this.index = index;
  }
  onResultClick() {
    // optional. Called when a result has been clicked
    // console.log('onResultClick');
  }
  onAutocompleteResultClick() {
    // optional. Called when an autocomplete result has been clicked
    // console.log('onAutocompleteResultClick');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async onSearch(requestState: any, queryConfig: any) {
    queryConfig.index = this.index;
    const response = await fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestState,
        queryConfig,
      }),
    });
    return response.json();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async onAutocomplete(requestState: any, queryConfig: any) {
    // requestState.searchTerm = requestState.searchTerm.trim();
    queryConfig.index = this.index;
    const response = await fetch('/api/autocomplete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requestState,
        queryConfig,
      }),
    });
    return response.json();
  }
}

export default APIConnector;
