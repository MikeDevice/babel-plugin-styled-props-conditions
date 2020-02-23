import React from 'react';
import Page from './Page';
import Button from './Button';

function PageWrapper() {
  return (
    <Page>
      <Button>default</Button>
      <Button primary>primary</Button>
      <Button secondary>secondary</Button>
    </Page>
  );
}

export default PageWrapper;
