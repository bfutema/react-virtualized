import styled from 'styled-components';

export const Container = styled.div`
  width: 500px;
  height: 500px;

  border: 1px solid #334b7a;

  padding: 8px;

  overflow: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #6c87bf;
    border-left: 3.5px solid #0a192f;
    border-right: 3.5px solid #0a192f;
    border-radius: 7px;
  }

  &::-webkit-scrollbar-thumb {
    background: #00bfff;
    border-radius: 7px;
    border-left: 2px solid #0a192f;
    border-right: 2px solid #0a192f;
  }
`;

export const Item = styled.div`
  border: 1px solid red;

  padding: 6px;

  & + div {
    margin-top: 4px;
  }
`;
