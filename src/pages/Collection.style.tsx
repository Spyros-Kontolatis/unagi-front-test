import styled from 'styled-components';
import breakpoints from '../constants/breakpoints';

export const Container = styled.div`
  padding: 24px;
`;
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column-gap: 4px;
  grid-row-gap: 24px;
  justify-items: center;
  align-items: center;
`;
export const ResponsiveCardGrid = styled(CardGrid)`
  @media (min-width: ${breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: ${breakpoints.lg}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: ${breakpoints.xl}) {
    grid-template-columns: repeat(6, 1fr);
  }
`;
export const StyledForm = styled.form`
    max-width: 500px;
    margin: 24px auto;
    border: 1px solid #000;
    padding: 20px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 3px;
    background-color: black;
    & > div {
      display: flex;
      flex-flow: row wrap;
      line-height: 2em;
      margin: 5px;
      & > label {
        color: gold;
        font-size: 1em;
        line-height: 32px;
        width: 100%;
        @media (min-width: ${breakpoints.sm}) {
            width: auto;
        }
      }
      & > select{
        
        padding: 3px 5px;
        font-size: 1em;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-top: 4px;
        width: 100%;
        @media (min-width: ${breakpoints.sm}) {
            margin-left: 15px;
            flex: 1;
        }
      }
`;
