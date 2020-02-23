import styled from 'styled-components';
import Button from '../Button';

export default styled(Button)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;
