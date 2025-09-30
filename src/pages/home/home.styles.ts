import styled from "styled-components";

export const Main = styled.div`
  gap: 16px;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 720px;
`;

export const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const InputWrap = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  outline: none;
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 8px;
  top: 8px;
  padding: 4px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  cursor: pointer;
`;

export const Muted = styled.div`
  color: #6b7280;
  margin-top: 12px;
`;

export const ErrorText = styled.div`
  color: #ef4444;
  margin-top: 12px;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 16px;
  display: grid;
  gap: 8px;
`;

export const ListItem = styled.li`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
`;

export const ItemTitle = styled.div`
  font-weight: 600;
`;

export const ItemDesc = styled.div`
  color: #374151;
`;
