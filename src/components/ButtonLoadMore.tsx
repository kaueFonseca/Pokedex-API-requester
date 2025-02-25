interface ButtonLoadMoreProps {
  
  onClick: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

const ButtonLoadMore = ({ onClick, isLoading, hasMore }: ButtonLoadMoreProps) => {
  if (!hasMore) return null;

  return (
    <button onClick={onClick} disabled={isLoading}>
      {isLoading ? "Loading..." : "Load More"}
    </button>
  );
};

export default ButtonLoadMore;
