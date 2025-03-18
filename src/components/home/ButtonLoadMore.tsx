import styled from "styled-components";

interface ButtonLoadMoreProps {

  onClick: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

const ButtonLoadMore = ({ onClick, isLoading, hasMore }: ButtonLoadMoreProps) => {
  if (!hasMore) return null;

  return (
    <DivButton>
      <Button onClick={onClick} disabled={isLoading}>
        {isLoading ? "Loading..." : "Load More"}
      </Button>
    </DivButton>

  );
};

const DivButton = styled.div`
  background-color: #f1f1f1;
`;


const Button = styled.button`
  background-color:rgb(118, 186, 115);
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px auto;

  &:hover {
    background-color: #e04e4e;
  }

  &:disabled {
    background-color: #b0b0b0;
    cursor: not-allowed;
  }
`;

export default ButtonLoadMore;