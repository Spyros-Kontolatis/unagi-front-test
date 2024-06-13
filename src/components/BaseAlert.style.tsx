import styled from 'styled-components';

export const AlertWrapper = styled.div`
  position: relative;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  color: #055160;
  background-color: #cff4fc;
  border-color: #b6effb;
`;

export const ErrorAlertWrapper = styled(AlertWrapper)`
  color: #842029;
  background-color: #f8d7da;
  border-color: #f5c2c7;
`;

export const SuccessAlertWrapper = styled(AlertWrapper)`
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
`;

export const WarningAlertWrapper = styled(AlertWrapper)`
  color: #664d03;
  background-color: #fff3cd;
  border-color: #ffecb5;
`;

export const AlertHideButton = styled.span`
  margin-left: 15px;
  color: white;
  font-weight: bold;
  float: right;
  font-size: 22px;
  line-height: 20px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: black;
  }
`;
