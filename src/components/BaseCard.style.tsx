import styled from 'styled-components';

export const CardWrapper = styled.div<{
  width: string | number;
  height: string | number;
  padding: string;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: black;
  border: 1px solid black;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${(props) => props.padding};
  position: relative;
  box-shadow: 0 0 #000000, 0 0 #000000, 0 0 #000000, 0 1px 2px -1px;
`;

export const CardTitle = styled.div<{ cardfontsize: string }>`
  font-size: ${(props) => props.cardfontsize};
  margin-top: 24px;
  color: gold;
  width: 80%;
  line-height: 2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;

  text-align: center;
`;

export const CardSubtitle = styled.div<{ cardfontsize: string }>`
  font-size: ${(props) => props.cardfontsize};
  text-align: center;
  color: lightyellow;
  margin-top: 8px;
`;

export const CardAction = styled.button`
  width: 50%;
  background-color: #07bb9c;
  border: 1px solid #07bb9c;
  color: black;
  font-weight: 600;
  border-radius: 24px;
  margin-top: 8px;
  padding: 12px 6px;
  cursor: pointer;
  &:hover {
    background-color: #069f85;
    border-color: #069f85;
  }
`;

export const CardContentSkeleton = styled.div<{
  width: string;
  height: string;
  cardmargintop?: string;
  cardborderradius?: string;
}>`
  animation: scale 3s linear infinite;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background: #e5e4e2;
  margin-top: ${(props) => props.cardmargintop ?? '8px'};
  border-radius: ${(props) => props.cardborderradius ?? ''};
  @keyframes scale {
    0% {
      opacity: 0.1;
    }
    25% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    75% {
      opacity: 0.5;
    }
    100% {
      opacity: 0.1;
    }
  }
`;
